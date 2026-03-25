import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import type { Task } from "../types/task";
import { DarkMode } from "../components/DarkMode";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get<Task[]>("/tasks");
      return response.data;
    },
  });

  async function handleLogout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }

    navigate("/login");
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="opacity-70">Carregando...</p>
      </div>
    );
  }

  const columns = {
    OPEN: tasks?.filter((t) => t.status === "OPEN") || [],
    IN_PROGRESS: tasks?.filter((t) => t.status === "IN_PROGRESS") || [],
    IN_REVIEW: tasks?.filter((t) => t.status === "IN_REVIEW") || [],
    DONE: tasks?.filter((t) => t.status === "DONE") || [],
  };

  function getStatusClass(status: string) {
    switch (status) {
      case "OPEN":
        return "status-open";
      case "IN_PROGRESS":
        return "status-in-progress";
      case "IN_REVIEW":
        return "status-in-review";
      case "DONE":
        return "status-done";
      default:
        return "";
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-custom bg-card">
        <h1 className="text-xl font-semibold">🐦 DevTask</h1>

        <div className="flex items-center gap-3">
          <DarkMode />

          <button
            onClick={handleLogout}
            className="px-3 py-1 cursor-pointer rounded-lg border border-custom text-sm hover:bg-red-500 hover:text-white transition"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-60 border-r border-custom bg-card p-4 hidden md:block">
          <nav className="flex flex-col gap-2">
            <a className="p-2 rounded-lg hover:bg-orange-500 hover:text-white transition cursor-pointer">
              📋 Tarefas
            </a>

            <a className="p-2 rounded-lg hover:bg-orange-500 hover:text-white transition cursor-pointer">
              ⚙️ Configurações
            </a>
          </nav>
        </aside>

        <main className="flex-1 overflow-x-auto p-6">
          <h1 className="text-2xl font-semibold mb-6">Dev Tarefas</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(columns).map(([status, items]) => (
              <div
                key={status}
                className="bg-card border border-custom rounded-xl p-4 min-h-400px"
              >
                <h2 className="font-semibold mb-4 flex items-center justify-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${getStatusClass(status)}`}
                  />
                  {status.replace("_", " ")}
                </h2>

                <div className="flex flex-col gap-3">
                  {items.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg border border-custom shadow-sm hover:shadow-md transition"
                    >
                      <h3 className="font-medium">{task.title}</h3>
                      <span
                        className={`inline-block mt-2 text-xs px-2 py-1 rounded-full text-white ${getStatusClass(
                          task.status,
                        )}`}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                    </div>
                  ))}

                  {items.length === 0 && (
                    <p className="text-sm opacity-50 text-center">
                      Sem tarefas
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
