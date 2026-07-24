// src/pages/ServiceOrders.tsx

import { useState } from "react";
import { useServiceOrders } from "../hooks/useServiceOrders";
import { NewServiceOrderForm } from "../components/NewServiceOrderForm";
import { ServiceOrderList } from "../components/ServiceOrderList";

export const ServiceOrders = () => {
  const {
    orders,
    clients,
    isLoading,
    deleteOrder,
    createOrder,
  } = useServiceOrders();


  const [device, setDevice] = useState("");
  const [issue, setIssue] = useState("");
  const [clientId, setClientId] = useState("");


  const resetForm = () => {
    setDevice("");
    setIssue("");
    setClientId("");
  };


  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createOrder(
        Number(clientId),
        device,
        issue
      );

      resetForm();

    } catch {
      alert("Erro ao criar a ordem. Verifique os dados.");
    }
  };


  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-slate-200">
        Service Orders
      </h2>

      <NewServiceOrderForm
        clients={clients}
        device={device}
        issue={issue}
        clientId={clientId}
        setDevice={setDevice}
        setIssue={setIssue}
        setClientId={setClientId}
        onSubmit={handleCreateOrder}
      />

      <ServiceOrderList
        orders={orders}
        isLoading={isLoading}
        onDelete={deleteOrder}
      />
    </div>
  );
};