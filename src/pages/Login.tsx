import { useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";
import { DarkMode } from "../components/DarkMode";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      await api.post("/auth/login", {
        email,
        password,
      });

      navigate("/");
    } catch {
      setError("Email ou senha inválidos");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center px-4 relative">
      <div className="absolute top-5 right-5">
        <DarkMode />
      </div>

      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-card border border-custom rounded-2xl p-8 shadow-xl backdrop-blur"
        >
          <h1 className="text-3xl font-semibold text-center mb-2">Bem-vindo</h1>

          <p className="text-sm text-center mb-6 opacity-70">
            Entre na sua conta
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <input
            className="w-full mb-3 p-3 rounded-lg border border-custom bg-transparent outline-none focus:ring-2 focus:ring-orange-500 transition"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full mb-5 p-3 rounded-lg border border-custom bg-transparent outline-none focus:ring-2 focus:ring-orange-500 transition"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn-primary cursor-pointer text-white w-full p-3 rounded-lg font-medium transition hover:scale-[1.02] active:scale-[0.98]">
            Entrar
          </button>

          <div className="mt-5 text-center">
            <a
              href="/register"
              className="text-sm opacity-80 hover:text-orange-500 transition"
            >
              Não tem acesso? Crie sua conta.
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
