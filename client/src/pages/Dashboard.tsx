import { useServiceOrders } from "../hooks/useServiceOrders";
import { ServiceOrderList } from "../components/serviceOrders/ServiceOrderList";

export const Dashboard = () => {
  const {
    orders,
    isLoading,
    deleteOrder,
    updateOrderStatus,
  } = useServiceOrders();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-200">
          Painel de Ordens de Serviço
        </h2>

        <p className="text-sm text-slate-400">
          Visão em tempo real de todos os dispositivos atualmente em manutenção.
        </p>
      </div>

      <ServiceOrderList
        orders={orders}
        isLoading={isLoading}
        onDelete={deleteOrder}
        onStatusChange={updateOrderStatus}
      />
    </div>
  );
};