import { useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";
import { DarkMode } from "../components/DarkMode";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setIsSuccess(false);

    if (!name || !email || !password) {
      setMessage("Preencha todos os campos");
      return;
    }

    if (name.length <= 2) {
      setMessage("Nome deve ter pelo menos 3 caracteres");
      return;
    }

    if (password.length < 6) {
      setMessage("Senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
      });

      setMessage("Usuário criado com sucesso");
      setIsSuccess(true);

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch {
      setMessage("Erro ao cadastrar");
      setIsSuccess(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center px-4 relative">
      <div className="absolute top-5 right-5">
        <DarkMode />
      </div>

      <div className="w-full max-w-md">
        <form
          onSubmit={handleRegister}
          className="bg-card border border-custom rounded-2xl p-8 shadow-xl"
        >
          <h1 className="text-3xl font-semibold text-center mb-2">
            Criar conta
          </h1>

          <p className="text-sm text-center mb-6 opacity-70">
            Comece agora gratuitamente
          </p>

          {message && (
            <p
              className={`text-sm mb-4 text-center ${
                isSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <input
            className="w-full mb-3 p-3 rounded-lg border border-custom bg-transparent outline-none focus:ring-2 focus:ring-orange-500 transition"
            type="text"
            value={name}
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full mb-3 p-3 rounded-lg border border-custom bg-transparent outline-none focus:ring-2 focus:ring-orange-500 transition"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full mb-5 p-3 rounded-lg border border-custom bg-transparent outline-none focus:ring-2 focus:ring-orange-500 transition"
            type="password"
            value={password}
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn-primary text-white w-full p-3 rounded-lg font-medium transition hover:scale-[1.02] active:scale-[0.98]">
            Cadastrar
          </button>

          <div className="mt-5 text-center">
            <a
              href="/login"
              className="text-sm opacity-80 hover:text-orange-500 transition"
            >
              Já tenho conta
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
