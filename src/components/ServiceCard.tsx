import type { ServiceOrder } from "../types";

interface ServiceCardProps {
  os: ServiceOrder;
  onDelete: (id: number) => void;
}

export const ServiceCard = ({ os, onDelete }: ServiceCardProps) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors relative group">
      <button 
        onClick={() => onDelete(os.id)}
        className="absolute top-3 right-3 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400"
        title="Delete Order"
      >
        Excluir
      </button>

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {os.status}
        </span>
        <span className="text-xs text-slate-500">ID: #{os.id}</span>
      </div>

      <h3 className="text-lg font-bold text-slate-100 mb-1">{os.client?.name || "Cliente ID: " + os.client_id}</h3>
      <p className="text-sm font-medium text-slate-400 mb-3">{os.device}</p>
      
      <p className="text-sm text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-850 line-clamp-3">
        {os.issue}
      </p>
    </div>
  );
};