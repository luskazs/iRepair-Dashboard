import { Routes, Route } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Dashboard } from "./pages/Dashboard";
import { Clients } from "./pages/Clients";
import { ServiceOrders } from "./pages/ServiceOrders";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/auth/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route
            path="service-orders"
            element={<ServiceOrders />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;