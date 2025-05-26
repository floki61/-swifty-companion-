import React from "react";
import { Text, View } from "react-native";

interface Project {
  id: number;
  final_mark?: number;
  status: string;
  project: {
    id: number;
    name: string;
  };
}

interface ProjectCardProps {
  project: Project;
  type: "completed" | "in_progress" | "failed";
}

export function ProjectCard({ project, type }: ProjectCardProps) {
  const getBadgeColor = () => {
    switch (type) {
      case "completed":
        return "bg-green-500";
      case "in_progress":
        return "bg-yellow-500";
      case "failed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = () => {
    switch (type) {
      case "completed":
        return "COMPLETED";
      case "in_progress":
        return "IN PROGRESS";
      case "failed":
        return "FAILED";
      default:
        return "UNKNOWN";
    }
  };

  const getScoreColor = () => {
    switch (type) {
      case "completed":
        return "text-green-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <View className="rounded-lg p-4 mb-3 bg-gray-800">
      <Text className="font-bold text-lg text-white">{project.project?.name}</Text>
      <View className="flex-row justify-between mt-2">
        {type === "in_progress" ? <Text className="text-gray-400">Not evaluated yet</Text> : <Text className={getScoreColor()}>Score: {project.final_mark || 0}/100</Text>}
        <View className={`${getBadgeColor()} px-2 py-1 rounded`}>
          <Text className="text-white text-xs font-bold">{getStatusText()}</Text>
        </View>
      </View>
    </View>
  );
}
