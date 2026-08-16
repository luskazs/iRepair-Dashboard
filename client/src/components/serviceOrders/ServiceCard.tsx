import type { ServiceOrder, ServiceStatus } from "../../types";
// A interface define o contrato do componente. Ela garante via TypeScript 
// que o componente pai (ex: Dashboard) passe exatamente as props necessárias 
// (um objeto ServiceOrder e uma função onDelete), evitando bugs de tipagem.
interface ServiceCardProps {
  os: ServiceOrder;
  onDelete: (id: number) => void;
  onStatusChange: (
    id: number,
    status: ServiceStatus,
  ) => Promise<void>;
}
function getStatusStyle(status: ServiceStatus) {
  switch(status) {
    case "open":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";

    case "in_progress":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

    case "done":
      return "bg-green-500/10 text-green-400 border-green-500/20";
  }
}
//Crie um componente chamado ServiceCard. Ele recebe um objeto de props que segue a interface ServiceCardProps e, ao recebê-lo, extraia imediatamente as propriedades os e onDelete para que possam ser usadas diretamente dentro do componente."
export const ServiceCard = ({ os, onDelete, onStatusChange }: ServiceCardProps) => {
  //em onClick, temos uma arrow function assim () => onDelete(os.id), aqui a gente ta  passando a funcao, então se fosse só assim onClick = {onDelete(os.id)}, a funcao ia ser executada automaticamente, aí ela ja seria deletada sem nem ter clicado. Como onDelete = handleDelete, aí a gente executa a funcao que ta la no dashboard

  // na parte de ServiceCard = ({ os, onDelete }: ServiceCardProps), inves de fazer a seguinte tipagem: ServiceCard = (props: ServiceCardProps), e ficar usando props.os e props.onDelete, a gente ja tira de dentro do objeto o que a gente vai utilizar, ficando daquele jeito encima, então nao preciso escrever nada.nada, apenas o os e o onDelete
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
        <select
  value={os.status}
  onChange={(event) =>
    void onStatusChange(
      os.id,
      event.target.value as ServiceStatus,
    )
  }
  className={`text-xs font-semibold px-2.5 py-1 rounded-full border outline-none cursor-pointer ${getStatusStyle(os.status)}`}
>
  <option value="open">
    Aberto
  </option>

  <option value="in_progress">
    Em andamento
  </option>

  <option value="done">
    Finalizado
  </option>
</select>
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