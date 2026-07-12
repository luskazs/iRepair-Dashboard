import type { OrdemServico } from "../types";

interface ServiceCardProps {
  os: OrdemServico;
}

export function ServiceCard({ os }: ServiceCardProps) {
 
  if (!os) {
    return null; 
  }

  const isAberto = os.status === "Aberto";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between gap-4">
      <div>
        {}
        <div className="flex justify-between items-start gap-2 mb-3">
          <h3 className="font-bold text-lg text-slate-100 tracking-tight">
            {os.cliente}
          </h3>
          
          {}
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
              isAberto
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-slate-500/10 text-slate-400 border-slate-500/20"
            }`}
          >
            {os.status}
          </span>
        </div>

        {}
        <div className="space-y-2 text-sm">
          <p className="text-slate-300">
            <span className="text-slate-500 font-medium">Aparelho:</span>{" "}
            {os.modeloAparelho}
          </p>
          <p className="text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-850 text-xs italic">
            <span className="text-slate-500 font-medium not-italic block mb-1">Defeito relatado:</span>
            "{os.defeito}"
          </p>
        </div>
      </div>

      {}
      {isAberto && (
        <button className="w-full text-center bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold py-2 rounded-lg transition-colors mt-2">
          Gerenciar OS
        </button>
      )}
    </div>
  );
}