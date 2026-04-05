import { useState, useEffect } from "react";

type FailedImport = {
  id: string;
  raw_payload: any;
  error_reason: string;
  data_tentativa: string;
};

export function AdminPortal() {
  const [errors, setErrors] = useState<FailedImport[]>([]);
  const [selected, setSelected] = useState<FailedImport | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [autor, setAutor] = useState("");

  const fetchErrors = async () => {
    try {
      const res = await fetch("/api/portal/errors");
      const data = await res.json();
      if (data.errors) {
        setErrors(data.errors);
      } else if (data.error) {
        alert("Erro no Servidor: " + data.error);
      }
    } catch (e: any) {
      alert("Falha ao comunicar com o servidor Vite.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchErrors();
  }, []);

  const handleSelect = (err: FailedImport) => {
    setSelected(err);
    const p = err.raw_payload || {};
    
    // Se o payload foi text bruto inparseavel, tentaremos não crashear
    setTitulo(p.titulo || "");
    setConteudo(p.conteudo_markdown || p.raw_text || "");
    setCategoria(p.categoria || "");
    setAutor(p.autor || "");
  };

  const handleRetry = async () => {
    if (!selected) return;
    try {
      const res = await fetch("/api/portal/retry", {
        method: "POST",
        body: JSON.stringify({
          id: selected.id,
          payload: { titulo, conteudo_markdown: conteudo, categoria, autor }
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Publicado com sucesso!");
        setSelected(null);
        fetchErrors();
      } else {
        alert("Erro ao re-publicar: " + data.error);
      }
    } catch (e: any) {
      alert("Falha fatal na rede.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Deletar esse erro permanentemente?")) return;
    await fetch("/api/portal/delete-error", { method: "POST", body: JSON.stringify({ id }) });
    if (selected?.id === id) setSelected(null);
    fetchErrors();
  };

  if (loading) return <div style={{ padding: 20, color: "#fff" }}>Carregando dados do Supabase...</div>;

  return (
    <div style={{ padding: 20, color: "#fff", display: "flex", gap: 20, height: "100%" }}>
      {/* Lista de Erros na Esquerda */}
      <div style={{ flex: 1, borderRight: "1px solid #333", paddingRight: 20, overflowY: "auto" }}>
        <h2 style={{ marginTop: 0 }}>🛡️ Malha Fina (Erros)</h2>
        <p style={{ color: "#888", fontSize: 13 }}>Revisão de postagens mal formatadas</p>
        
        {errors.length === 0 ? (
          <div style={{ padding: 20, background: "#1a3a1a", border: "1px solid #2e7d32", borderRadius: 8, color: "#a5d6a7" }}>
            ✅ Nenhum erro pendente! Supabase limpo.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {errors.map(err => (
              <div 
                key={err.id} 
                onClick={() => handleSelect(err)}
                style={{ 
                  background: selected?.id === err.id ? "#333" : "#111", 
                  padding: 15, borderRadius: 8, cursor: "pointer", border: "1px solid #444",
                  borderLeft: "4px solid #f44336"
                }}
              >
                <div style={{ fontSize: 12, color: "#aaa", marginBottom: 5 }}>
                  {new Date(err.data_tentativa).toLocaleString()}
                </div>
                <div style={{ color: "#ff5252", fontSize: 14, fontWeight: "bold", marginBottom: 10 }}>
                  Motivo: {err.error_reason}
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(err.id); }} style={{ background: "transparent", color: "#ff5252", border: "1px solid #ff5252", padding: "5px 10px", borderRadius: 4, cursor: "pointer" }}>Descartar</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor do Erro na Direita */}
      <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: 15, overflowY: "auto", paddingRight: 10 }}>
        {!selected ? (
          <div style={{ margin: "auto", color: "#555" }}>Selecione um erro à esquerda para corrigi-lo.</div>
        ) : (
          <>
            <h3 style={{ margin: 0, color: "#4caf50" }}>Corrigir e Publicar</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 13, color: "#aaa" }}>Título</label>
              <input value={titulo} onChange={e => setTitulo(e.target.value)} style={{ padding: 10, background: "#111", color: "#fff", border: "1px solid #333", borderRadius: 4 }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 13, color: "#aaa" }}>Categoria</label>
              <input value={categoria} onChange={e => setCategoria(e.target.value)} style={{ padding: 10, background: "#111", color: "#fff", border: "1px solid #333", borderRadius: 4 }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label style={{ fontSize: 13, color: "#aaa" }}>Autor</label>
              <input value={autor} onChange={e => setAutor(e.target.value)} style={{ padding: 10, background: "#111", color: "#fff", border: "1px solid #333", borderRadius: 4 }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
              <label style={{ fontSize: 13, color: "#aaa" }}>Conteúdo Markdown do Erro Bruto (Cru)</label>
              <textarea 
                value={conteudo} 
                onChange={e => setConteudo(e.target.value)} 
                style={{ padding: 10, background: "#111", color: "#fff", border: "1px solid #333", borderRadius: 4, height: 300, resize: "vertical", fontFamily: "monospace", fontSize: 13 }} 
              />
            </div>

            <button 
              onClick={handleRetry}
              style={{ padding: 15, background: "#4caf50", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: "bold", fontSize: 16 }}
            >
              🚀 Forçar Publicação no Supabase
            </button>
          </>
        )}
      </div>
    </div>
  );
}
