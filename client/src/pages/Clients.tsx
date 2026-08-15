import { useState } from "react";
import { useClients } from "../hooks/useClients";
import { NewClientForm } from "../components/clients/NewClientForm";
import { ClientList } from "../components/clients/ClientList";

export const Clients = () => {
  const {
    clients,
    isLoading,
    createClient,
    deleteClient,
  } = useClients();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();

    await createClient(name, phone, email);

    setName("");
    setPhone("");
    setEmail("");
  };

  return (
    <div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-200">
          Clientes
        </h2>

        <p className="text-sm text-slate-400">
          Gerencie seus clientes cadastrados.
        </p>
      </div>

      <NewClientForm
        name={name}
        phone={phone}
        email={email}
        setName={setName}
        setPhone={setPhone}
        setEmail={setEmail}
        onSubmit={handleCreateClient}
      />

      <ClientList
        clients={clients}
        isLoading={isLoading}
        onDelete={deleteClient}
      />

    </div>
  );
};