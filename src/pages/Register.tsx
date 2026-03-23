import { useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";

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

    // validações
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

      setMessage("Usuário criado com sucesso ");
      setIsSuccess(true);

      // limpa campos
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
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h1 className="text-xl text-center mb-4">Cadastro</h1>

        {message && (
          <p
            className={`text-center mb-2 ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <input
          className="border w-full mb-2 p-2"
          type="text"
          value={name}
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border w-full mb-2 p-2"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border w-full mb-4 p-2"
          type="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-500 text-white w-full p-2 cursor-pointer">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
