import { ProjectTabs } from "@/components/projects/ProjectTabs";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Project, ProjectType } from "@/types/project";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProjectsScreen() {
  const [activeTab, setActiveTab] = useState<ProjectType>("completed");
  const { userData, error, retry } = useUserProfile();

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-black p-5">
        <Text className="text-red-500 text-base text-center mb-5">{error}</Text>
        <TouchableOpacity className="bg-green-500 p-4 rounded-xl w-4/5 items-center mb-2" onPress={retry}>
          <Text className="text-white font-bold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center bg-black p-5">
        <Text className="text-gray-400 text-base text-center mb-5">Loading your projects...</Text>
      </View>
    );
  }

  const projects = (userData.projects_users || []) as Project[];
  const completedProjects = projects.filter((p: Project) => p.status === "finished" && p.final_mark && p.final_mark >= 50);
  const inProgressProjects = projects.filter((p: Project) => p.status === "in_progress");
  const failedProjects = projects.filter((p: Project) => p.status === "finished" && (!p.final_mark || p.final_mark < 50));

  return (
    <View className="flex-1 bg-black px-4">
      <ProjectTabs activeTab={activeTab} setActiveTab={setActiveTab} completedCount={completedProjects.length} inProgressCount={inProgressProjects.length} failedCount={failedProjects.length} />
      <ScrollView className="flex-1 pb-20">
        {activeTab === "completed" && <ProjectsList projects={completedProjects} type="completed" />}
        {activeTab === "in_progress" && <ProjectsList projects={inProgressProjects} type="in_progress" />}
        {activeTab === "failed" && <ProjectsList projects={failedProjects} type="failed" />}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
