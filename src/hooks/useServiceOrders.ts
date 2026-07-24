// src/hooks/useServiceOrders.ts

import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { ServiceOrder, Client } from "../types";

export const useServiceOrders = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);

      const [ordersRes, clientsRes] = await Promise.all([
        api.get<ServiceOrder[]>("/service-orders"),
        api.get<Client[]>("/clients"),
      ]);

      const ordersWithClients = ordersRes.data.map((order) => ({
        ...order,
        client: clientsRes.data.find(
          (client) => client.id === order.client_id
        ),
      }));

      setOrders(ordersWithClients);
      setClients(clientsRes.data);

    } catch (error) {
      console.error("Erro ao carregar ordens:", error);

    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    void fetchOrders();
  }, []);


  const deleteOrder = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta ordem?")) {
      return;
    }

    try {
      await api.delete(`/service-orders/${id}`);
      await fetchOrders();

    } catch (error) {
      console.error("Erro ao deletar ordem:", error);
    }
  };


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
      console.error("Erro ao criar ordem:", error);
      throw error;
    }
  };


  return {
    orders,
    clients,
    isLoading,
    deleteOrder,
    createOrder,
    refreshOrders: fetchOrders,
  };
};