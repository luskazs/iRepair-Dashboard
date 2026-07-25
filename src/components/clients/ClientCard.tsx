import type { Client } from "../../types";

interface ClientCardProps {
  client: Client;
  onDelete: (id: number) => void;
}

export const ClientCard = ({ client, onDelete }: ClientCardProps) => {
  return (
    <div className="flex justify-between items-center bg-slate-900 p-4 rounded-lg border border-slate-800">
      <div>
        <p className="font-bold">{client.name}</p>

        <p className="text-sm text-slate-400">
          Celular: {client.phone} | Email: {client.email}
        </p>
      </div>

      <button
        onClick={() => onDelete(client.id)}
        className="text-red-400 hover:text-red-300"
      >
        Excluir
      </button>
    </div>
  );
};