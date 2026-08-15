
import { useState } from "react";
import { useServiceOrders } from "../hooks/useServiceOrders";
import { NewServiceOrderForm } from "../components/serviceOrders/NewServiceOrderForm";
import { ServiceOrderList } from "../components/serviceOrders/ServiceOrderList";
import { useClients } from "../hooks/useClients";

export const ServiceOrders = () => {
  const {
  orders,
  isLoading,
  createOrder,
  deleteOrder,
  updateOrderStatus
} = useServiceOrders();

const {
  clients,
} = useClients();


  const [device, setDevice] = useState("");
  const [issue, setIssue] = useState("");
  const [clientId, setClientId] = useState("");


  const resetForm = () => {
    setDevice("");
    setIssue("");
    setClientId("");
  };


  const handleCreateOrder = async (e: React.FormEvent) => { //tipo de evento
    e.preventDefault(); //pra n recarregar a pagina

    try {
      await createOrder(
        Number(clientId), //converte pra numero
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
        Ordens de Serviço
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
        onStatusChange={updateOrderStatus}
      />
    </div>
  );
};