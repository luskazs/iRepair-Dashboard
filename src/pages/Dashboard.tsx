import { useServiceOrders } from "../hooks/useServiceOrders";
import { ServiceCard } from "../components/ServiceCard";

export const Dashboard = () => {
  const {
    orders,
    isLoading,
    deleteOrder,
  } = useServiceOrders();

  return (
    <div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-200">
          Dashboard de Ordens de Serviço
        </h2>

        <p className="text-sm text-slate-400">
          Visão em tempo real de todos os aparelhos em manutenção
        </p>
      </div>

      {isLoading ? (

        <p className="text-slate-400">
          Carregando ordens do sistema...
        </p>

      ) : orders.length === 0 ? (

        <p className="text-slate-500 text-center py-12">
          Nenhuma ordem de serviço pendente no momento.
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {orders.map((os) => (

            <ServiceCard
              key={os.id}
              os={os}
              onDelete={deleteOrder}
            />

          ))}

        </div>

      )}

    </div>
  );
};