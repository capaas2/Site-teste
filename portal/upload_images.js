const fs = require('fs');
const path = require('path');

const supabaseUrl = "https://cfqwufidvchaybqknuar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcXd1ZmlkdmNoYXlicWtudWFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMyODA0OCwiZXhwIjoyMDkwOTA0MDQ4fQ.4EFbfd7AahVJNuvv8kur-7upva7GPPFWuHwEWIDyQkI";

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
    { p: 'C:\\Users\\super\\.gemini\\antigravity\\brain\\8c75ad88-7e9f-41b0-9dda-6f82b227f134\\gpt54_reasoning_interface_1775777748353.png', n: 'gpt54_reasoning.png' },
    { p: 'C:\\Users\\super\\.gemini\\antigravity\\brain\\8c75ad88-7e9f-41b0-9dda-6f82b227f134\\gpt54_benchmark_computer_use_1775777769570.png', n: 'gpt54_benchmark.png' }
];

(async () => {
    console.log("Iniciando upload de imagens reais...");
    for (const f of files) {
        await upload(f.p, f.n);
    }
    console.log("Upload concluído.");
})();
