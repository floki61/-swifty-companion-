export interface UserInterface {
  id: number;
  login: string;
  email: string;
  displayname?: string;
  first_name?: string;
  last_name?: string;
  image?: {
    link: string;
  };
  image_url?: string;
  wallet?: number;
  correction_point?: number;
  phone?: string;
  campus?: Array<{
    id: number;
    name: string;
  }>;
  cursus_users?: Array<{
    cursus_id: number;
    level: number;
    cursus: {
      id: number;
      slug: string;
      name: string;
    };
  }>;
  projects_users?: Array<{
    id: number;
    final_mark?: number;
    status: string;
    project: {
      id: number;
      name: string;
    };
  }>;
}
