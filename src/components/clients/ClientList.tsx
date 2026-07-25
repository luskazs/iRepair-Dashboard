import type { Client } from "../../types";
import { ClientCard } from "./ClientCard";

interface ClientListProps {
  clients: Client[];
  isLoading: boolean;
  onDelete: (id: number) => void;
}

export const ClientList = ({
  clients,
  isLoading,
  onDelete,
}: ClientListProps) => {

  if (isLoading) {
    return (
      <p className="text-slate-400">
        Carregando clientes...
      </p>
    );
  }

  if (clients.length === 0) {
    return (
      <p className="text-slate-500 text-center py-12">
        Nenhum cliente encontrado.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};