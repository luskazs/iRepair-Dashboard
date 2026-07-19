import { useEffect, useState } from "react";
import { api } from "../services/api";
import { ServiceCard } from "../components/ServiceCard";
import type { ServiceOrder, Client } from "../types";

export const ServiceOrders = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [device, setDevice] = useState("");
  const [issue, setIssue] = useState("");
  const [clientId, setClientId] = useState("");

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta ordem?")) {
      try {
        await api.delete(`/service-orders/${id}`);
        fetchData();
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [ordersRes, clientsRes] = await Promise.all([
        api.get<ServiceOrder[]>("/service-orders"),
        api.get<Client[]>("/clients"),
      ]);

      const ordersWithClients = ordersRes.data.map((order) => {
        const foundClient = clientsRes.data.find((c) => c.id === order.client_id);
        return {
          ...order,
          client: foundClient,
        };
      });

      setOrders(ordersWithClients);
      setClients(clientsRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/service-orders", {
        clientId: Number(clientId),
        device,
        issue,
        status: "open",
      });
      setDevice("");
      setIssue("");
      setClientId("");
      fetchData(); 
    } catch (error) {
      console.error("Erro ao criar ordem:", error);
      alert("Erro ao criar a ordem. Verifique os dados.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-slate-200">Service Orders</h2>

      <form onSubmit={handleCreateOrder} className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Device Model"
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
            required
          />
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
            required
          >
            <option value="">Select a Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-500 w-full md:w-auto">
          Create Order
        </button>
      </form>

      {isLoading ? (
        <p className="text-slate-400">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No service orders registered.</p>
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