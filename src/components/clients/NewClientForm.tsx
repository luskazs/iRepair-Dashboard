import type React from "react";

interface NewClientFormProps {
  name: string;
  phone: string;
  email: string;

  setName: (value: string) => void;
  setPhone: (value: string) => void;
  setEmail: (value: string) => void;

  onSubmit: (e: React.FormEvent) => void;
}

export const NewClientForm = ({
  name,
  phone,
  email,
  setName,
  setPhone,
  setEmail,
  onSubmit,
}: NewClientFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8"
    >
      <div className="flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Nome do Cliente"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100"
          required
        />

        <input
          type="text"
          placeholder="Número de Celular"
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

        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-500"
        >
          Adicionar Cliente
        </button>

      </div>
    </form>
  );
};