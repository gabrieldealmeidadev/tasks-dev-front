import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import type { Task } from "../types/task";

export function Dashboard() {
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get<Task[]>("/tasks");
      return response.data;
    },
  });

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Tarefas</h1>

      <div className="grid gap-4">
        {tasks?.map(
          (
            task, // 👈 sem tipo aqui
          ) => (
            <div key={task.id} className="border p-4 rounded">
              <h2 className="font-bold">{task.title}</h2>
              <p>{task.status}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
