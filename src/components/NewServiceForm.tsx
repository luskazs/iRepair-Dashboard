import { useState } from "react";

interface NewServiceFormProps {
  onAddOS: (cliente: string, aparelho: string, defeito: string) => void;
}

export function NewServiceForm({ onAddOS }: NewServiceFormProps) {
  const [cliente, setCliente] = useState("");
  const [aparelho, setAparelho] = useState("");
  const [defeito, setDefeito] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (!cliente || !aparelho || !defeito) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    
    onAddOS(cliente, aparelho, defeito);

    
    setCliente("");
    setAparelho("");
    setDefeito("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg mb-8 space-y-4">
      <h3 className="text-lg font-semibold text-cyan-400 mb-2">Nova Ordem de Serviço</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Nome do Cliente</label>
          <input
            type="text"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Ex: João Silva"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-150 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Modelo do Aparelho</label>
          <input
            type="text"
            value={aparelho}
            onChange={(e) => setAparelho(e.target.value)}
            placeholder="Ex: iPhone 14 Pro"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-150 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Defeito Relatado</label>
        <textarea
          value={defeito}
          onChange={(e) => setDefeito(e.target.value)}
          placeholder="Descreva o problema do aparelho..."
          rows={3}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-150 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm rounded-lg transition-colors shadow-md"
      >
        Salvar Ordem de Serviço
      </button>
    </form>
  );
}