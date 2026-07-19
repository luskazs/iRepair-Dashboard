import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Client } from "../types";

export const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

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

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/clients", { name, phone, email });
      setName("");
      setPhone("");
      setEmail("");
      fetchClients();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClient = async (id: number) => {
    try {
      await api.delete(`/clients/${id}`);
      fetchClients();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-slate-200">Clients</h2>

      <form onSubmit={handleCreateClient} className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
            required
          />
          <button type="submit" className="bg-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-500">
            Add
          </button>
        </div>
      </form>

      {isLoading ? (
        <p className="text-slate-400">Loading clients...</p>
      ) : (
        <div className="space-y-4">
          {clients.map((client) => (
            <div key={client.id} className="flex justify-between items-center bg-slate-900 p-4 rounded-lg border border-slate-800">
              <div>
                <p className="font-bold">{client.name}</p>
                <p className="text-sm text-slate-400">Phone: {client.phone} | Email: {client.email}</p>
              </div>
              <button 
                onClick={() => handleDeleteClient(client.id)}
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};