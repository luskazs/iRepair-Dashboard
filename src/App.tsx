import { useState } from "react";
import { Header } from "./components/Header";
import { ServiceCard } from "./components/ServiceCard";
import { NewServiceForm } from "./components/NewServiceForm";
import type { OrdemServico } from "./types";

const listaInicial: OrdemServico[] = [
  {
    id: "1",
    cliente: "Lucas Silva",
    modeloAparelho: "iPhone 13 Pro",
    defeito: "Bateria viciada e tela trincada no canto inferior.",
    status: "Aberto",
  },
  {
    id: "2",
    cliente: "Maria Souza",
    modeloAparelho: "Samsung Galaxy S23",
    defeito: "Não liga após cair na piscina.",
    status: "Finalizado",
  },
];

function App() {
  const [ordens, setOrdens] = useState<OrdemServico[]>(listaInicial);
  const handleAddOS = (cliente: string, aparelho: string, defeito: string) => {
    const novaOS: OrdemServico = {
      id: Date.now().toString(), 
      cliente,
      modeloAparelho: aparelho,
      defeito,
      status: "Aberto", 
    };

    
    setOrdens([novaOS, ...ordens]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-12">
      <Header />
      
      <main className="max-w-6xl mx-auto p-4 mt-6">
        <NewServiceForm onAddOS={handleAddOS} />

        <hr className="border-slate-800 my-6" />

        <h2 className="text-xl font-semibold mb-4 text-slate-200">
          Painel de Acompanhamento ({ordens.length})
        </h2>

        {ordens.length === 0 ? (
          <p className="text-slate-500 text-center py-8">Nenhuma ordem de serviço cadastrada.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ordens.map((os) => (
              <ServiceCard key={os.id} os={os} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;