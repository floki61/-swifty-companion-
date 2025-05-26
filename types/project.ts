export interface Project {
  id: number;
  final_mark?: number;
  status: string;
  marked_at?: string;
  "validated?"?: boolean;
  project: {
    id: number;
    name: string;
  };
}

export type ProjectType = "completed" | "in_progress" | "failed";
