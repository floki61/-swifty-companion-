import React from "react";
import { Text } from "react-native";
import { ProjectCard } from "./ProjectCard";
import { TabType } from "./ProjectTabs";

interface Project {
  id: number;
  final_mark?: number;
  status: string;
  project: {
    id: number;
    name: string;
  };
}

interface ProjectsListProps {
  projects: Project[];
  type: TabType;
}

export function ProjectsList({ projects, type }: ProjectsListProps) {
  const getEmptyMessage = () => {
    switch (type) {
      case "completed":
        return "No completed projects yet";
      case "in_progress":
        return "No projects in progress";
      case "failed":
        return "No failed projects";
      default:
        return "No projects found";
    }
  };

  if (projects.length === 0) {
    return <Text className="text-gray-400 italic text-center mt-8">{getEmptyMessage()}</Text>;
  }

  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} type={type} />
      ))}
    </>
  );
}
