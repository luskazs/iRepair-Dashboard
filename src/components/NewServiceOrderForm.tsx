import type React from "react";
import type { Client } from "../types";


interface NewServiceOrderFormProps {

  clients: Client[];

  device: string;
  issue: string;
  clientId: string;

  setDevice: (value: string) => void;
  setIssue: (value: string) => void;
  setClientId: (value: string) => void;

  onSubmit: (e: React.FormEvent) => void;

}



export const NewServiceOrderForm = ({
  clients,
  device,
  issue,
  clientId,
  setDevice,
  setIssue,
  setClientId,
  onSubmit,

}: NewServiceOrderFormProps) => {


  return (

    <form 
      onSubmit={onSubmit}
      className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8 space-y-4"
    >


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


          <option value="">
            Select a Client
          </option>



          {clients.map((client) => (

            <option 
              key={client.id}
              value={client.id}
            >

              {client.name}

            </option>

          ))}


        </select>


      </div>



      <button

        type="submit"

        className="bg-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-500 w-full md:w-auto"

      >

        Create Order

      </button>



    </form>

  );

};