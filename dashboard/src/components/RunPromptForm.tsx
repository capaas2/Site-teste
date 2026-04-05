import { useState } from "react";
import { useSquadStore } from "@/store/useSquadStore";

export function RunPromptForm() {
  const squadsMap = useSquadStore((s) => s.squads);
  const squads = Array.from(squadsMap.values());
  const [selected, setSelected] = useState(squads[0]?.code || "tech-news-writer");
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("");

  const handleRun = async () => {
    if (!prompt) return;
    setStatus("Despachando para os agentes...");
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        body: JSON.stringify({ squad: selected, prompt }),
      });
      if (res.ok) {
        setStatus("✅ Pauta encaminhada para a máquina editorial!");
        setPrompt("");
      } else {
        setStatus("❌ Erro ao solicitar pauta.");
      }
    } catch {
      setStatus("❌ Erro de rede.");
    }
  };

  return (
    <div style={{ padding: 40, width: "100%", maxWidth: 800, margin: "0 auto", color: "#ddd" }}>
      <h2 style={{ marginBottom: 10, color: "#fff" }}>Lançar Nova Pauta Oculta</h2>
      <p style={{ color: "#888", marginBottom: 30 }}>
        Derrame sua ideia investigativa aqui. O Esquadrão será acordado nos bastidores para realizar a curadoria de imagens, fact-checking e escrita do HTML.
      </p>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Esquadrão Alvo:</label>
        <select 
          value={selected} 
          onChange={(e) => setSelected(e.target.value)}
          style={{ width: "100%", padding: 12, background: "#111", color: "#fff", border: "1px solid #333", borderRadius: 4 }}
        >
          {squads.map(s => (
            <option key={s.code} value={s.code}>{s.icon} {s.name}</option>
          ))}
          {/* Fallback just in case */}
          {!squads.find(s => s.code === "tech-news-writer") && <option value="tech-news-writer">📰 Redação Tech</option>}
        </select>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>Briefing da Matéria (O que eles devem investigar?)</label>
        <textarea 
          placeholder="Ex: Quero um dossiê atacando o uso de IA corporativa vs demissões com o tom de voz sombrio..."
          rows={6}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: "100%", padding: 12, background: "#111", color: "#fff", border: "1px solid #333", borderRadius: 4, fontFamily: "monospace", resize: "vertical" }}
        />
      </div>

      <button 
        onClick={handleRun}
        disabled={!prompt}
        style={{ background: "#4caf50", color: "#000", fontWeight: "bold", padding: "12px 24px", border: "none", borderRadius: 4, cursor: prompt ? "pointer" : "not-allowed" }}
      >
        ► APROVAR PAUTA E RODAR ROBÔS
      </button>

      {status && <div style={{ marginTop: 20, padding: 15, background: "#222", borderLeft: "4px solid #4caf50", borderRadius: 4 }}>{status}</div>}
    </div>
  );
}
