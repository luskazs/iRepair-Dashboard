import type { ServiceOrder } from "../types";

interface ServiceCardProps {
  os: ServiceOrder;
}

export const ServiceCard = ({ os }: ServiceCardProps) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {os.status}
        </span>
        <span className="text-xs text-slate-500">ID: #{os.id}</span>
      </div>

      <h3 className="text-lg font-bold text-slate-100 mb-1">{os.client?.name || "No Client"}</h3>
      <p className="text-sm font-medium text-slate-400 mb-3">{os.deviceModel}</p>
      
      <p className="text-sm text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-850 line-clamp-3">
        {os.description}
      </p>
    </div>
  );
};