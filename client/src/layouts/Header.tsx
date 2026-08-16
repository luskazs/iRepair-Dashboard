import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive
        ? "text-cyan-300"
        : "text-slate-400 hover:text-white"
    }`;

  return (
    <header className="bg-slate-900 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-wide text-cyan-200">
            iRepair
          </h1>

          <p className="text-sm text-slate-400">
            Service Orders Dashboard
          </p>
        </div>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={navLinkClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/clients"
            className={navLinkClass}
          >
            Clientes
          </NavLink>

          <NavLink
            to="/service-orders"
            className={navLinkClass}
          >
            Ordens
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">
            {user?.email}
          </span>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}