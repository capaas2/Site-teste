import { useState, useEffect } from "react";
import { useSquadStore } from "@/store/useSquadStore";

export function PublicationViewer() {
  const squadsMap = useSquadStore((s) => s.squads);
  const squads = Array.from(squadsMap.values());
  const [selected, setSelected] = useState(squads[0]?.code || "tech-news-writer");
  const [published, setPublished] = useState<{id: string, url: string}[]>([]);
  const [activeSite, setActiveSite] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/published/${selected}`)
      .then(r => r.json())
      .then(d => setPublished(d.published || []))
      .catch(() => setPublished([]));
  }, [selected]);

  if (activeSite) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
        <div style={{ padding: "10px 20px", background: "#1a1a1a", borderBottom: "1px solid #333", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span><strong>Visualizando Simulador de Portal:</strong> {activeSite}</span>
          <button 
            onClick={() => setActiveSite(null)}
            style={{ background: "#d32f2f", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 4, cursor: "pointer" }}
          >
            ✕ Fechar Janela e Voltar
          </button>
        </div>
        <iframe 
          src={activeSite} 
          style={{ flex: 1, width: "100%", border: "none", background: "#fff" }}
          title="Generated Site"
        />
      </div>
    );
  }

  return (
    <div style={{ padding: 40, width: "100%", maxWidth: 900, margin: "0 auto", color: "#ddd" }}>
      <h2 style={{ marginBottom: 10, color: "#fff" }}>Arquivos e Sites Publicados</h2>
      <p style={{ color: "#888", marginBottom: 30 }}>
        Selecione o esquadrão para ver a galeria do portal de notícias estáticas montadas pelos robôs em HTML puro e finalizado.
      </p>

      <div style={{ marginBottom: 30 }}>
        <select 
          value={selected} 
          onChange={(e) => setSelected(e.target.value)}
          style={{ width: "100%", padding: 12, background: "#111", color: "#fff", border: "1px solid #333", borderRadius: 4 }}
        >
          {squads.map(s => (
            <option key={s.code} value={s.code}>{s.icon} {s.name}</option>
          ))}
          {!squads.find(s => s.code === "tech-news-writer") && <option value="tech-news-writer">📰 Redação Tech</option>}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
        {published.length === 0 ? (
          <p>Nenhuma publicação encontrada no output final.</p>
        ) : (
          published.map(pub => (
            <div 
              key={pub.id}
              onClick={() => setActiveSite(pub.url)}
              style={{
                background: "#181818", 
                border: "1px solid #333", 
                borderRadius: 8, 
                padding: 20, 
                cursor: "pointer",
                transition: "transform 0.2s, borderColor 0.2s"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4caf50")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#333")}
            >
              <div style={{ fontSize: 24, marginBottom: 10 }}>🌐</div>
              <h3 style={{ fontSize: 16, margin: "0 0 10px 0", color: "#fff" }}>RUN: {pub.id}</h3>
              <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Renderizar view do portal compilado (index.html)</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
