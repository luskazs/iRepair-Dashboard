import { useEffect, useState } from "react";
import { api } from "../services/api";
import { ServiceCard } from "../components/ServiceCard";
import type { ServiceOrder, Client } from "../types";

export const Dashboard = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta ordem?")) {
      try {
        await api.delete(`/service-orders/${id}`);
        fetchDashboardData();
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [ordersRes, clientsRes] = await Promise.all([
        api.get<ServiceOrder[]>("/service-orders"),
        api.get<Client[]>("/clients"),
      ]);

      const fullOrders = ordersRes.data.map((order) => ({
        ...order,
        client: clientsRes.data.find((c) => c.id === order.client_id),
      }));

      setOrders(fullOrders);
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-200">Dashboard de Ordens de Serviço</h2>
          <p className="text-sm text-slate-400">Visão em tempo real de todos os aparelhos em manutenção</p>
        </div>
      </div>

      {isLoading ? (
        <p className="text-slate-400">Carregando ordens do sistema...</p>
      ) : orders.length === 0 ? (
        <p className="text-slate-500 text-center py-12">Nenhuma ordem de serviço pendente no momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((os) => (
            <ServiceCard key={os.id} os={os} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};