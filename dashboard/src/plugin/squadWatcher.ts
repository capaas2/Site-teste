import type { Plugin, ViteDevServer } from "vite";
import { WebSocketServer, WebSocket } from "ws";
import type { Server, IncomingMessage, ServerResponse } from "node:http";
import type { Duplex } from "node:stream";
import fs from "node:fs";
import fsp from "node:fs/promises";
import { watch as chokidarWatch } from "chokidar";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import type { SquadInfo, SquadState, WsMessage } from "../types/state";
import "dotenv/config";
import https from "node:https";

const supabaseUrl = (process.env.SUPABASE_URL || "").replace(/[\r\n"' ]/g, "");
const supabaseKey = (process.env.SUPABASE_ANON_KEY || "").replace(/[\r\n"' ]/g, "");

// Usa node:https nativo para evitar conflito com o fetch interceptado pelo Vite
function sbRequest(method: string, table: string, data?: Record<string, any>, filter?: string): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    if (!supabaseUrl || !supabaseKey) return reject(new Error("Supabase not configured"));
    
    const base = supabaseUrl.replace(/\/+$/, "");
    const urlPath = `/rest/v1/${table}${filter ? `?${filter}` : ""}`;
    const parsedUrl = new URL(base + urlPath);
    const body = data ? JSON.stringify([data]) : undefined;

    const req = https.request({
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method,
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": method === "POST" ? "return=minimal" : "",
        ...(body ? { "Content-Length": Buffer.byteLength(body) } : {}),
      }
    }, (res) => {
      let raw = "";
      res.on("data", (chunk) => raw += chunk);
      res.on("end", () => {
        try { resolve({ status: res.statusCode || 0, body: raw ? JSON.parse(raw) : null }); }
        catch { resolve({ status: res.statusCode || 0, body: raw }); }
      });
    });

    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

// Upload de arquivo binário para o Supabase Storage via node:https
function sbStorageUpload(bucket: string, filename: string, fileBuffer: Buffer, mimeType: string): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    if (!supabaseUrl || !supabaseKey) return reject(new Error("Supabase not configured"));

    const base = supabaseUrl.replace(/\/+$/, "");
    const urlPath = `/storage/v1/object/${bucket}/${filename}`;
    const parsedUrl = new URL(base + urlPath);

    const req = https.request({
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname,
      method: "POST",
      headers: {
        "Content-Type": mimeType,
        "Content-Length": fileBuffer.length,
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "x-upsert": "true",
      }
    }, (res) => {
      let raw = "";
      res.on("data", (chunk) => raw += chunk);
      res.on("end", () => {
        try { resolve({ status: res.statusCode || 0, body: raw ? JSON.parse(raw) : null }); }
        catch { resolve({ status: res.statusCode || 0, body: raw }); }
      });
    });

    req.on("error", reject);
    req.write(fileBuffer);
    req.end();
  });
}

// Gera a URL pública de um arquivo no Supabase Storage
function sbStoragePublicUrl(bucket: string, filename: string): string {
  const base = supabaseUrl.replace(/\/+$/, "");
  return `${base}/storage/v1/object/public/${bucket}/${filename}`;
}

function resolveSquadsDir(): string {
  const candidates = [
    path.resolve(process.cwd(), "../squads"),
    path.resolve(process.cwd(), "squads"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return path.resolve(process.cwd(), "../squads");
}

async function discoverSquads(squadsDir: string): Promise<SquadInfo[]> {
  let entries;
  try {
    entries = await fsp.readdir(squadsDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const squads: SquadInfo[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;

    const yamlPath = path.join(squadsDir, entry.name, "squad.yaml");
    try {
      const raw = await fsp.readFile(yamlPath, "utf-8");
      const parsed = parseYaml(raw);
      const s = parsed?.squad;
      if (s) {
        squads.push({
          code: typeof s.code === "string" ? s.code : entry.name,
          name: typeof s.name === "string" ? s.name : entry.name,
          description: typeof s.description === "string" ? s.description : "",
          icon: typeof s.icon === "string" ? s.icon : "\u{1F4CB}",
          agents: Array.isArray(s.agents) ? (s.agents as unknown[]).filter((a): a is string => typeof a === "string") : [],
        });
        continue;
      }
    } catch {}

    squads.push({
      code: entry.name,
      name: entry.name,
      description: "",
      icon: "\u{1F4CB}",
      agents: [],
    });
  }

  return squads;
}

function isValidState(data: unknown): data is SquadState {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.status === "string" &&
    d.step != null && typeof d.step === "object" &&
    Array.isArray(d.agents)
  );
}

async function readActiveStates(squadsDir: string): Promise<Record<string, SquadState>> {
  const states: Record<string, SquadState> = {};
  let entries;
  try {
    entries = await fsp.readdir(squadsDir, { withFileTypes: true });
  } catch {
    return states;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const statePath = path.join(squadsDir, entry.name, "state.json");
    try {
      const raw = await fsp.readFile(statePath, "utf-8");
      const parsed = JSON.parse(raw);
      if (isValidState(parsed)) {
        states[entry.name] = parsed;
      }
    } catch {}
  }
  return states;
}

async function buildSnapshot(squadsDir: string): Promise<WsMessage> {
  return {
    type: "SNAPSHOT",
    squads: await discoverSquads(squadsDir),
    activeStates: await readActiveStates(squadsDir),
  };
}

function broadcast(wss: WebSocketServer, msg: WsMessage) {
  const data = JSON.stringify(msg);
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(data);
      } catch {}
    }
  }
}

function serveJson(res: ServerResponse, obj: any, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-cache" });
  res.end(JSON.stringify(obj));
}

// Parse raw text body for Vite middlewares
async function parseBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => { body += chunk.toString(); });
    req.on("end", () => resolve(body));
  });
}

export function squadWatcherPlugin(): Plugin {
  return {
    name: "squad-watcher",
    configureServer(server: ViteDevServer) {
      if (!server.httpServer) return;

      const squadsDir = resolveSquadsDir();
      const wss = new WebSocketServer({ noServer: true });

      (server.httpServer as Server).on("upgrade", (req: IncomingMessage, socket: Duplex, head: Buffer) => {
        if (req.url === "/__squads_ws") {
          wss.handleUpgrade(req, socket, head, (ws) => { wss.emit("connection", ws, req); });
        }
      });

      wss.on("connection", async (ws) => {
        try {
          const snap = await buildSnapshot(squadsDir);
          ws.send(JSON.stringify(snap));
        } catch {}
      });

      fsp.mkdir(squadsDir, { recursive: true }).catch(() => {});

      // NEW REST APIs
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/snapshot" && req.method === "GET") {
          const snapshot = await buildSnapshot(squadsDir);
          return serveJson(res, snapshot);
        }

        if (req.url === "/api/run" && req.method === "POST") {
          try {
            const body = await parseBody(req);
            const { squad, prompt } = JSON.parse(body);
            if (!squad || !prompt) return serveJson(res, { error: "Missing squad or prompt" }, 400);

            // Write to a request queue or simulate kickoff
            const reqPath = path.join(squadsDir, squad, "run_request.json");
            await fsp.writeFile(reqPath, JSON.stringify({ prompt, timestamp: new Date().toISOString() }));
            return serveJson(res, { success: true, message: "Run request cached" });
          } catch (e: any) {
            return serveJson(res, { error: e.message }, 500);
          }
        }

        if (req.url?.startsWith("/api/published/") && req.method === "GET") {
          const squad = req.url.split("/")[3];
          if (!squad) return serveJson(res, { error: "Missing squad param" }, 400);

          try {
            const outDir = path.join(squadsDir, squad, "output");
            const runs = await fsp.readdir(outDir, { withFileTypes: true });
            const published = [];
            for (const r of runs) {
              if (r.isDirectory()) {
                // Just assuming v1 holds the HTML for simplicty in UI
                const indexPath = path.join(outDir, r.name, "v1", "index.html");
                if (fs.existsSync(indexPath)) {
                  published.push({ id: r.name, url: `/api/render/${squad}/${r.name}/v1/index.html` });
                }
              }
            }
            // Sort to show newest first
            published.sort((a, b) => b.id.localeCompare(a.id));
            return serveJson(res, { published });
          } catch {
            return serveJson(res, { published: [] });
          }
        }

        if (req.url?.startsWith("/api/render/") && req.method === "GET") {
          // format: /api/render/tech-news-writer/2026-04-04-144400/v1/index.html
          const parts = req.url.split("/").slice(3); // [squad, runId, "v1", "index.html"]
          if (parts.length < 2) {
             res.statusCode = 400;
             return res.end("Bad Request");
          }
          const squad = parts[0];
          const relativePath = parts.slice(1).join("/");
          const absPath = path.join(squadsDir, squad, "output", relativePath);
          try {
            let content = await fsp.readFile(absPath, "utf-8");
            // Fix absolute file URIs for images so iframe can load them locally? 
            // The images are currently file:/// URIs in generated HTML. Chrome blocks file:/// in iframes!
            // We can replace file:/// with an endpoint, but since they are absolute paths, we need to serve them via Vite
            res.setHeader("Content-Type", "text/html");
            return res.end(content);
          } catch {
            res.statusCode = 404;
            return res.end("Not Found");
          }
        }

        // --- NOVO: APIs DE CHAT INTERATIVO ---
        if (req.url?.startsWith("/api/chat/") && req.method === "GET") {
          const squad = req.url.split("/")[3];
          if (!squad) return serveJson(res, { error: "Missing squad param" }, 400);
          
          try {
            const chatPath = path.join(squadsDir, squad, "_memory", "chat.json");
            if (!fs.existsSync(chatPath)) return serveJson(res, { chat: [] });
            const content = await fsp.readFile(chatPath, "utf-8");
            return serveJson(res, { chat: JSON.parse(content) });
          } catch {
            return serveJson(res, { chat: [] });
          }
        }

        if (req.url?.startsWith("/api/chat/") && req.method === "POST") {
          const squad = req.url.split("/")[3];
          if (!squad) return serveJson(res, { error: "Missing squad param" }, 400);
          
          try {
            const body = await parseBody(req);
            const msg = JSON.parse(body);
            
            const memeoryDir = path.join(squadsDir, squad, "_memory");
            await fsp.mkdir(memeoryDir, { recursive: true }).catch(() => {});
            const chatPath = path.join(memeoryDir, "chat.json");
            
            let chat = [];
            if (fs.existsSync(chatPath)) {
              chat = JSON.parse(await fsp.readFile(chatPath, "utf-8"));
            }
            if (msg.clear) {
              chat = [];
            } else if (msg.role && msg.text) {
              chat.push({ role: msg.role, text: msg.text, timestamp: new Date().toISOString() });
            }
            await fsp.writeFile(chatPath, JSON.stringify(chat, null, 2));
            return serveJson(res, { success: true, chat });
          } catch (e: any) {
            return serveJson(res, { error: e.message }, 500);
          }
        }

        // --- SUPABASE PORTAL APIs (via node:https nativo) ---
        if (req.url === "/api/portal/publish" && req.method === "POST") {
          try {
            const body = await parseBody(req);
            let payload: any;
            try {
              payload = JSON.parse(body);
            } catch (e: any) {
              if (supabaseUrl) {
                await sbRequest("POST", "failed_imports", { raw_payload: { raw_text: body }, error_reason: "JSON Parse Error: " + e.message });
              }
              return serveJson(res, { error: "Invalid JSON. Saved to failed_imports." }, 400);
            }

            if (!payload.titulo || !payload.conteudo_markdown || !payload.categoria || !payload.autor) {
              if (supabaseUrl) {
                const r = await sbRequest("POST", "failed_imports", { raw_payload: payload, error_reason: "Missing required fields" });
                if (r.status >= 400) return serveJson(res, { error: "Supabase Save Error: " + JSON.stringify(r.body) }, 500);
              }
              return serveJson(res, { error: "Missing fields. Saved to failed_imports." }, 400);
            }

            if (!supabaseUrl) return serveJson(res, { error: "Supabase not configured in .env" }, 500);

            // --- Upload da imagem base64 para o Storage (opcional) ---
            let imagem_url: string | null = null;
            if (payload.imagem_base64) {
              try {
                // Detecta o mime type pelo cabeçalho base64 (ex: data:image/png;base64,...)
                const match = payload.imagem_base64.match(/^data:([^;]+);base64,/);
                const mimeType = match ? match[1] : "image/png";
                const ext = mimeType.split("/")[1] || "png";
                const base64Data = payload.imagem_base64.replace(/^data:[^;]+;base64,/, "");
                const fileBuffer = Buffer.from(base64Data, "base64");
                const filename = `capa-${Date.now()}.${ext}`;

                const uploadResult = await sbStorageUpload("capas_noticias", filename, fileBuffer, mimeType);
                if (uploadResult.status >= 400) {
                  console.warn("[Portal] Falha no upload da imagem:", uploadResult.body);
                  (payload as any).__upload_error = JSON.stringify(uploadResult.body);
                } else {
                  imagem_url = sbStoragePublicUrl("capas_noticias", filename);
                }
              } catch (imgErr: any) {
                (payload as any).__upload_error = imgErr.message;
                console.warn("[Portal] Erro ao processar imagem base64:", imgErr.message);
              }
            }

            // --- Salva o post no banco ---
            const r = await sbRequest("POST", "posts", {
              titulo: payload.titulo,
              conteudo_markdown: payload.conteudo_markdown,
              categoria: payload.categoria,
              autor: payload.autor,
              ...(imagem_url ? { imagem_url } : {}),
            });
            if (r.status >= 400) return serveJson(res, { error: "Supabase Error: " + JSON.stringify(r.body) }, 500);
            return serveJson(res, { 
              success: true, 
              imagem_url,
              upload_error: (payload as any).__upload_error || null
            });

          } catch (e: any) {
            return serveJson(res, { error: e.message }, 500);
          }
        }

        if (req.url === "/api/portal/errors" && req.method === "GET") {
          if (!supabaseUrl) return serveJson(res, { error: "Supabase not configured" }, 500);
          try {
            const r = await sbRequest("GET", "failed_imports", undefined, "order=data_tentativa.desc");
            if (r.status >= 400) throw new Error(JSON.stringify(r.body));
            return serveJson(res, { errors: Array.isArray(r.body) ? r.body : [] });
          } catch (e: any) {
            return serveJson(res, { error: e.message }, 500);
          }
        }

        if (req.url === "/api/portal/retry" && req.method === "POST") {
          if (!supabaseUrl) return serveJson(res, { error: "Supabase not configured" }, 500);
          try {
            const body = await parseBody(req);
            const { id, payload } = JSON.parse(body);
            if (!id || !payload) return serveJson(res, { error: "Missing id or payload" }, 400);

            const rInsert = await sbRequest("POST", "posts", {
              titulo: payload.titulo,
              conteudo_markdown: payload.conteudo_markdown,
              categoria: payload.categoria,
              autor: payload.autor,
            });
            if (rInsert.status >= 400) throw new Error(JSON.stringify(rInsert.body));

            await sbRequest("DELETE", "failed_imports", undefined, `id=eq.${id}`);
            return serveJson(res, { success: true });
          } catch (e: any) {
            return serveJson(res, { error: e.message }, 500);
          }
        }

        if (req.url === "/api/portal/delete-error" && req.method === "POST") {
          if (!supabaseUrl) return serveJson(res, { error: "Supabase not configured" }, 500);
          try {
            const body = await parseBody(req);
            const { id } = JSON.parse(body);
            await sbRequest("DELETE", "failed_imports", undefined, `id=eq.${id}`);
            return serveJson(res, { success: true });
          } catch (e: any) { return serveJson(res, { error: e.message }, 500); }
        }


        next();
      });

      const watcher = chokidarWatch(squadsDir, {
        ignoreInitial: true,
        awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 50 },
        ignored: [/(^|[/\\])\./, /node_modules/, /output[/\\]/],
        depth: 2,
      });

      function handleFileChange(filePath: string) {
        const relative = path.relative(squadsDir, filePath).replace(/\\/g, "/");
        const parts = relative.split("/");
        if (parts.length < 2) return;
        const squadName = parts[0], fileName = parts[1];

        if (fileName === "state.json") {
          fsp.readFile(filePath, "utf-8").then((raw) => {
            const parsed = JSON.parse(raw);
            if (!isValidState(parsed)) return;
            broadcast(wss, { type: "SQUAD_UPDATE", squad: squadName, state: parsed });
          }).catch(() => {});
        } else if (fileName === "squad.yaml") {
          buildSnapshot(squadsDir).then((snap) => broadcast(wss, snap));
        }
      }

      function handleFileRemoval(filePath: string) {
        const relative = path.relative(squadsDir, filePath).replace(/\\/g, "/");
        const parts = relative.split("/");
        if (parts.length < 2) return;
        const squadName = parts[0], fileName = parts[1];

        if (fileName === "state.json") {
          broadcast(wss, { type: "SQUAD_INACTIVE", squad: squadName });
        } else if (fileName === "squad.yaml") {
          buildSnapshot(squadsDir).then((snap) => broadcast(wss, snap));
        }
      }

      watcher.on("add", handleFileChange);
      watcher.on("change", handleFileChange);
      watcher.on("unlink", handleFileRemoval);

      server.httpServer.on("close", () => watcher.close());
    },
  };
}
