// Teste de publicação com imagem base64
// Usa uma imagem PNG mínima válida (1x1 pixel vermelho) codificada em base64

const imagemBase64Teste = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI6QAAAABJRU5ErkJggg==";

const payload = {
  titulo: "Teste: SpaceX Project Apex + Upload de Imagem",
  conteudo_markdown: "## Teste de Integração\n\nEsta matéria foi publicada com uma imagem de capa enviada em Base64 pelo Squad.",
  categoria: "Teste",
  autor: "Sistema Bot",
  imagem_base64: imagemBase64Teste
};

try {
  console.log("📤 Enviando matéria com imagem Base64...");
  const res = await fetch("http://localhost:5173/api/portal/publish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (data.success) {
    console.log("✅ Publicado com sucesso!");
    console.log("🖼️  URL da imagem:", data.imagem_url || "(nenhuma)");
    if (data.upload_error) {
      console.log("⚠️  Erro no upload do Storage:", data.upload_error);
    }
  } else {
    console.log("❌ Erro ao publicar:", data.error);
  }
} catch (err) {
  console.error("💥 Falha de rede:", err.message);
}
