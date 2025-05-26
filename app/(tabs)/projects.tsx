import { ProjectSearch } from "@/components/projects/ProjectSearch";
import { ProjectTabs } from "@/components/projects/ProjectTabs";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Project, ProjectType } from "@/types/project";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProjectsScreen() {
  const [activeTab, setActiveTab] = useState<ProjectType>("completed");
  const [searchQuery, setSearchQuery] = useState("");
  const { userData, error, retry } = useUserProfile();

  const projects = useMemo(() => {
    return (userData?.projects_users || []) as Project[];
  }, [userData]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    return projects.filter((p: Project) => p.project?.name?.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [projects, searchQuery]);

  const completedProjects = useMemo(() => {
    return filteredProjects.filter((p: Project) => p.status === "finished" && p["validated?"] === true);
  }, [filteredProjects]);

  const inProgressProjects = useMemo(() => {
    return filteredProjects.filter((p: Project) => p.status === "in_progress");
  }, [filteredProjects]);

  const failedProjects = useMemo(() => {
    return filteredProjects.filter((p: Project) => p.status === "finished" && p["validated?"] === false);
  }, [filteredProjects]);

  return (
    <View className="flex-1 bg-black px-4">
      <ProjectSearch totalProjects={projects.length} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ProjectTabs activeTab={activeTab} setActiveTab={setActiveTab} completedCount={completedProjects.length} inProgressCount={inProgressProjects.length} failedCount={failedProjects.length} />
      {error ? (
        <View className="flex-1 justify-center items-center p-5">
          <Text className="text-red-500 text-base text-center mb-5">{error}</Text>
          <TouchableOpacity className="bg-green-500 p-4 rounded-xl w-4/5 items-center mb-2" onPress={retry}>
            <Text className="text-white font-bold">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : !userData ? (
        <View className="flex-1 justify-center items-center p-5">
          <ActivityIndicator size="large" color="#10b981" />
          <Text className="text-gray-400 text-base text-center mt-4">Loading your projects...</Text>
        </View>
      ) : (
        <ScrollView className="flex-1 pb-20" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <ProjectsList projects={activeTab === "completed" ? completedProjects : activeTab === "in_progress" ? inProgressProjects : failedProjects} type={activeTab} />
          <View className="h-24" />
        </ScrollView>
      )}
    </View>
  );
}
