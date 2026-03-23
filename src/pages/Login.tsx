import { useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // ✅ validação simples
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
    <div className="h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl text-center mb-4">Login</h1>

        {error && <p className="text-red-500">{error}</p>}

        <input
          className="border w-full mb-2 p-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border w-full mb-4 p-2"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white w-full p-2">Entrar</button>
      </form>
      <a
        className="text-center mt-2  p-1 rounded hover:bg-blue-500 hover:text-white"
        href="/register"
      >
        Cadastre-se
      </a>
    </div>
  );
}
