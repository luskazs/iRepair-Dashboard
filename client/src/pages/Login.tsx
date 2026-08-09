import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      await login(email, password);

      navigate("/");
    } catch {
      setError("E-mail ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4"
      >
        <div>
          <h1 className="text-2xl font-semibold">
            iRepair
          </h1>

          <p className="text-sm text-slate-400">
            Entre na sua conta
          </p>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm mb-1"
          >
            E-mail
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm mb-1"
          >
            Senha
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
            className="w-full rounded border px-3 py-2"
          />
        </div>

        {error && (
          <p className="text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded px-4 py-2"
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};