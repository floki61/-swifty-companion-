export interface Project {
  id: number;
  final_mark?: number;
  status: string;
  project: {
    id: number;
    name: string;
  };
}

export type ProjectType = "completed" | "in_progress" | "failed";
