import { useState, useEffect, useRef } from "react";
import { useSquadStore } from "@/store/useSquadStore";

type ChatMessage = {
  role: "system" | "user" | "agent";
  name?: string;
  text: string;
  timestamp?: string;
};

export function ChatConsole() {
  const squadsMap = useSquadStore((s) => s.squads);
  const squads = Array.from(squadsMap.values());
  const [selected, setSelected] = useState(squads[0]?.code || "tech-news-writer");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchChat = async () => {
    try {
      const res = await fetch(`/api/chat/${selected}`);
      const data = await res.json();
      if (data.chat) setMessages(data.chat);
    } catch {}
  };

  useEffect(() => {
    fetchChat();
    const interval = setInterval(fetchChat, 2000); // Polling simple for UX
    return () => clearInterval(interval);
  }, [selected]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const txt = input;
    setInput("");
    
    // Optistic update
    setMessages(prev => [...prev, { role: "user", text: txt }]);

    try {
      await fetch(`/api/chat/${selected}`, {
        method: "POST",
        body: JSON.stringify({ role: "user", text: txt })
      });
      fetchChat();
    } catch {}
  };

  const handleStart = async () => {
    try {
      await fetch(`/api/chat/${selected}`, {
        method: "POST",
        body: JSON.stringify({ role: "system", text: "Comando de Início disparado pelo Operador." })
      });
      fetchChat();
    } catch {}
  };

  const handleClear = async () => {
    try {
      await fetch(`/api/chat/${selected}`, {
        method: "POST",
        body: JSON.stringify({ clear: true })
      });
      fetchChat();
    } catch {}
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 20, maxWidth: 1000, margin: "0 auto", width: "100%" }}>
      
      {/* Header do Console */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ color: "#fff", margin: "0 0 5px 0" }}>Terminal de Comunicação</h2>
          <p style={{ color: "#888", margin: 0, fontSize: 13 }}>Inicie um ciclo ou responda os Agentes.</p>
        </div>
        
        <select 
          value={selected} 
          onChange={(e) => setSelected(e.target.value)}
          style={{ width: 250, padding: 10, background: "#111", color: "#fff", border: "1px solid #333", borderRadius: 4 }}
        >
          {squads.map(s => (
            <option key={s.code} value={s.code}>{s.icon} {s.name}</option>
          ))}
          {!squads.find(s => s.code === "tech-news-writer") && <option value="tech-news-writer">📰 Redação Tech</option>}
        </select>
      </div>

      {/* Janela de Chat */}
      <div style={{ flex: 1, background: "#111", border: "1px solid #333", borderRadius: 8, padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 15 }}>
        {messages.length === 0 ? (
          <div style={{ margin: "auto", textAlign: "center", color: "#555" }}>
            Nenhum histórico de conversa neste esquadrão.<br/><br/>
            <button onClick={handleStart} style={{ padding: "10px 20px", background: "#4caf50", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: "bold" }}>
              ▶ Iniciar Novo Ciclo de Pautas
            </button>
          </div>
        ) : (
          messages.map((m, idx) => (
            <div key={idx} style={{ 
              alignSelf: m.role === "user" ? "flex-end" : "flex-start", 
              background: m.role === "user" ? "#4caf50" : m.role === "system" ? "#333" : "#222",
              color: "#fff", padding: "10px 15px", borderRadius: 8, maxWidth: "80%",
              border: m.role === "agent" ? "1px solid #555" : "none"
            }}>
              {m.role === "agent" && <div style={{ fontSize: 11, color: "#aaa", marginBottom: 5, fontWeight: "bold" }}>🤖 {m.name || "Agente"}</div>}
              {m.role === "system" && <div style={{ fontSize: 11, color: "#aaa", marginBottom: 5, fontWeight: "bold" }}>⚙️ SISTEMA</div>}
              {m.role === "user" && <div style={{ fontSize: 11, color: "#cfc", marginBottom: 5, fontWeight: "bold" }}>🧑‍💻 OPERADOR</div>}
              
              <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.4", fontSize: 14 }}>{m.text}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Barra de Input */}
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Responda os Agentes aqui..."
          style={{ flex: 1, padding: 15, background: "#111", border: "1px solid #333", color: "#fff", borderRadius: 4, outline: "none" }}
        />
        <button 
          onClick={handleSend}
          style={{ padding: "0 25px", background: "#4caf50", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: "bold" }}
        >
          Enviar
        </button>
        <button 
          onClick={handleClear}
          style={{ padding: "0 15px", background: "#333", color: "#888", border: "none", borderRadius: 4, cursor: "pointer" }}
          title="Limpar Histórico"
        >
          🗑️
        </button>
      </div>

    </div>
  );
}
