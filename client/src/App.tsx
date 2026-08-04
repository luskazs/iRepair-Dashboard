import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/Clients';
import { ServiceOrders } from './pages/ServiceOrders';

const App = () => {
  return ( 
    <Routes> // isso vem do browser router, inves de fazer um app.tsx gigante, a gente separa em paginas dependendo de onde o usuario está, fica mais limpo
      <Route path="/" element={<RootLayout />}> // essa aqui é a rota mãe
        <Route index element={<Dashboard />} /> // todos os filhos usam o RootLayout como "base", o index element = "/", então a aba padrão com só o /, é o Dashboard
        <Route path="clients" element={<Clients />} />
        <Route path="service-orders" element={<ServiceOrders />} />
      </Route>
    </Routes>
  );
};

export default App;