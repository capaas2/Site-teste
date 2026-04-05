import React, { useState } from "react";
import { useSquadSocket } from "@/hooks/useSquadSocket";
import { SquadSelector } from "@/components/SquadSelector";
import { PhaserGame } from "@/office/PhaserGame";
import { StatusBar } from "@/components/StatusBar";
import { ChatConsole } from "@/components/ChatConsole";
import { PublicationViewer } from "@/components/PublicationViewer";
import { AdminPortal } from "@/components/AdminPortal";

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "white", padding: 20, whiteSpace: "pre-wrap", background: "red" }}>
          <h1>App Crashed!</h1>
          <p>{this.state.error && this.state.error.toString()}</p>
          <pre>{this.state.error && this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children; 
  }
}

function MainApp() {
  useSquadSocket();
  const [activeTab, setActiveTab] = useState<"office" | "prompt" | "published" | "admin">("published");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: "#0a0a0a"
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          height: 50,
          minHeight: 50,
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-sidebar)",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0.5,
          color: "#fff"
        }}
      >
        <div style={{ color: "#4caf50", fontWeight: "bold", fontSize: 16 }}>OPENSQUAD DASHBOARD</div>
        
        <div style={{ display: "flex", gap: 15 }}>
          <button 
            onClick={() => setActiveTab("prompt")}
            style={{
              background: "transparent", border: "none", color: activeTab === "prompt" ? "#4caf50" : "#888", 
              cursor: "pointer", fontWeight: activeTab === "prompt" ? "bold" : "normal", fontSize: 14
            }}
          >
            💬 Terminal de Comunicação
          </button>
          
          <button 
            onClick={() => setActiveTab("office")}
            style={{
              background: "transparent", border: "none", color: activeTab === "office" ? "#4caf50" : "#888", 
              cursor: "pointer", fontWeight: activeTab === "office" ? "bold" : "normal", fontSize: 14
            }}
          >
            🏢 Monitorar Escritório
          </button>

          <button 
            onClick={() => setActiveTab("published")}
            style={{
              background: "transparent", border: "none", color: activeTab === "published" ? "#4caf50" : "#888", 
              cursor: "pointer", fontWeight: activeTab === "published" ? "bold" : "normal", fontSize: 14
            }}
          >
            📰 Histórico de Portais
          </button>

          <button 
            onClick={() => setActiveTab("admin")}
            style={{
              background: "transparent", border: "none", color: activeTab === "admin" ? "#f44336" : "#888", 
              cursor: "pointer", fontWeight: activeTab === "admin" ? "bold" : "normal", fontSize: 14,
              borderLeft: "2px solid #555", paddingLeft: 15
            }}
            title="Dead Letter Queue e Gerencia Supabase"
          >
            🛡️ Admin (Erros de Post)
          </button>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden", color: 'white' }}>
        {activeTab === "office" && (
          <>
            <SquadSelector />
            <PhaserGame />
          </>
        )}
        
        {activeTab === "prompt" && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <ChatConsole />
          </div>
        )}
        
        {activeTab === "published" && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            <PublicationViewer />
          </div>
        )}

        {activeTab === "admin" && (
          <div style={{ flex: 1, overflowY: "auto", background: "#0a0a0a" }}>
            <AdminPortal />
          </div>
        )}
      </div>

      <StatusBar />
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <MainApp />
    </ErrorBoundary>
  );
}
