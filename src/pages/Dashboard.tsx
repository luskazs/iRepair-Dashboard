import { useEffect, useState } from "react";
import { api } from "../services/api";
import { ServiceCard } from "../components/ServiceCard";
import type { ServiceOrder } from "../types";

export const Dashboard = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        
        const response = await api.get<ServiceOrder[]>("/service-orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching service orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-slate-200">
        Painel de Acompanhamento ({orders.length})
      </h2>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-slate-400 animate-pulse text-lg">Carregando ordens de serviço...</p>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-slate-500 text-center py-8">Nenhuma ordem de serviço cadastrada na API.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((os) => (
            <ServiceCard key={os.id} os={os} />
          ))}
        </div>
      )}
    </div>
  );
};