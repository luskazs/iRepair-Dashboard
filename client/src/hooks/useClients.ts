import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Client } from "../types";

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchClients = async () => {
    try {
      setIsLoading(true);

      const response = await api.get<Client[]>("/clients");

      setClients(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const createClient = async (
    name: string,
    phone: string,
    email: string
  ) => {
    try {
      await api.post("/clients", {
        name,
        phone,
        email,
      });

      await fetchClients();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClient = async (id: number) => {
    try {
      await api.delete(`/clients/${id}`);

      await fetchClients();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    clients,
    isLoading,
    createClient,
    deleteClient,
    refreshClients: fetchClients,
  };
};