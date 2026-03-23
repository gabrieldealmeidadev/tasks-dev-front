export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "OPEN" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
  priority: "EASY" | "MEDIUM" | "HARD";
  dueDate?: string;
  createdAt: string;
};
