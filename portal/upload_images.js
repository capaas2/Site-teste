const fs = require('fs');
const path = require('path');

function loadEnv() {
  const possiblePaths = [
    path.resolve(__dirname, ".env.local"),
    path.resolve(__dirname, "../portal/.env.local"),
    path.resolve(__dirname, "../.env"),
    path.resolve(process.cwd(), ".env.local"),
    path.resolve(process.cwd(), ".env"),
  ];

  for (const envPath of possiblePaths) {
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, "utf8");
      return Object.fromEntries(
        envFile
          .split("\n")
          .filter((line) => line.includes("=") && !line.startsWith("#"))
          .map((line) => {
            const idx = line.indexOf("=");
            return [line.slice(0, idx).trim(), line.slice(idx + 1).trim()];
          })
      );
    }
  }
  return {};
}

const env = loadEnv();
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

async function upload(filePath, fileName) {
    try {
        const file = fs.readFileSync(filePath);
        const res = await fetch(`${supabaseUrl}/storage/v1/object/capas_noticias/${fileName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'image/png',
                'x-upsert': 'true'
            },
            body: file
        });
        const data = await res.json();
        console.log(`Uploaded ${fileName} to capas_noticias:`, JSON.stringify(data));
    } catch (e) {
        console.error(`Error uploading ${fileName}:`, e.message);
    }
}

const files = [
    { p: 'c:\\Users\\gusta\\OneDrive\\Documentos\\Site-teste\\squads\\tech-news-writer\\output\\2026-06-18-013300\\v1\\assets\\wetware_biological_brain_chip.png', n: 'wetware_biological_brain_chip.png' },
    { p: 'c:\\Users\\gusta\\OneDrive\\Documentos\\Site-teste\\squads\\tech-news-writer\\output\\2026-06-18-013300\\v1\\assets\\automated_microfluidic_incubator.png', n: 'automated_microfluidic_incubator.png' }
];

(async () => {
    console.log("Iniciando upload de imagens reais...");
    for (const f of files) {
        await upload(f.p, f.n);
    }
    console.log("Upload concluído.");
})();
