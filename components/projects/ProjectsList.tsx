import { Project, ProjectType } from "@/types/project";
import React from "react";
import { Text, View } from "react-native";

interface ProjectsListProps {
  projects: Project[];
  type: ProjectType;
}

export function ProjectsList({ projects, type }: ProjectsListProps) {

  // Helper function for relative time calculation
  const getRelativeTime = (dateString: string | undefined) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();

    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
      return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    } else {
      return "Today";
    }
  };

  return (
    <>
      {projects.length === 0 ? (
        <Text className="text-gray-400 italic text-center mt-8">{type === "completed" ? "No completed projects yet" : type === "in_progress" ? "No projects in progress" : "No failed projects"}</Text>
      ) : (
        projects.map((project) => {
          const scoreColor = type === "completed" ? "text-green-500" : type === "failed" ? "text-red-500" : "text-gray-400";
          const scoreText = type === "in_progress" ? "In progress" : `${project.final_mark || 0}/100`;
          const relativeTimeText = project.marked_at ? getRelativeTime(project.marked_at) : "";
          
          return (
            <View key={project.id} className="rounded-lg p-3 mb-2 bg-gray-800">
              <View className="flex-row justify-between items-center">
                <Text className="font-bold text-white flex-1" numberOfLines={1} ellipsizeMode="tail">
                  {project.project?.name}
                </Text>
                <Text className={`${scoreColor} ml-2 font-medium`}>{scoreText}</Text>
              </View>
              {relativeTimeText && <Text className={`${scoreColor} text-xs mt-1 opacity-80`}>{relativeTimeText}</Text>}
            </View>
          );
        })
      )}
    </>
  );
}
