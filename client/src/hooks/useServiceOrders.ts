import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Client, ServiceOrder } from "../types";

export const useServiceOrders = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);

      const [ordersResponse, clientsResponse] = await Promise.all([
        api.get<ServiceOrder[]>("/service-orders"),
        api.get<Client[]>("/clients"),
      ]);

      const ordersWithClients = ordersResponse.data.map((order) => ({
        ...order,

        client: clientsResponse.data.find(
          (client) => client.id === order.client_id
        ),
      }));

      setOrders(ordersWithClients);
      setClients(clientsResponse.data);
    } catch (error) {
      console.error("Error loading service orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchOrders();
  }, []);

  const createOrder = async (
    clientId: number,
    device: string,
    issue: string
  ) => {
    try {
      await api.post("/service-orders", {
        clientId,
        device,
        issue,
        status: "open",
      });

      await fetchOrders();
    } catch (error) {
      console.error("Error creating service order:", error);
      throw error;
    }
  };

  const deleteOrder = async (id: number) => {
    const shouldDelete = confirm(
      "Tem certeza que quer excluir essa ordem de serviço?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await api.delete(`/service-orders/${id}`);

      await fetchOrders();
    } catch (error) {
      console.error("Error deleting service order:", error);
      throw error;
    }
  };

  return {
    orders,
    clients,
    isLoading,
    createOrder,
    deleteOrder,
    refreshOrders: fetchOrders,
  };
};