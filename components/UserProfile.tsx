import { IconSymbol } from "@/components/ui/IconSymbol";
import { UserInterface } from "@/types/user";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface UserProfileProps {
  user: UserInterface;
}

export function UserProfile({ user }: UserProfileProps) {
  // Get the current cursus level
  const currentCursus = user.cursus_users?.find((c) => c.cursus.slug === "42cursus" || c.cursus_id === 21);
  const level = currentCursus?.level || 0;
  // Calculate level percentage (max level is 21)
  const levelPercentage = Math.min((level / 21) * 100, 100);

  // Get display name from available fields
  const displayName = user.displayname || (user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.login);

  // Get profile image URL
  const profileImage = user.image?.link || user.image_url;

  // Get top 3 projects
  const topProjects =
    user.projects_users?.slice(0, 3).map((p) => ({
      name: p.project?.name || "Unknown Project",
      score: p.final_mark || 0,
      status: p.status,
    })) || [];

  return (
    <ScrollView className="flex-1 pb-20">
      {/* User header with profile image */}
      <View className="items-center py-8 px-4 border-b border-gray-800">
        {profileImage && (
          <View className="mb-4 rounded-full border-2 border-green-500 p-1">
            <Image source={{ uri: profileImage }} className="w-32 h-32 rounded-full" resizeMode="cover" />
          </View>
        )}
        <Text className="text-2xl font-bold text-white mb-1">{displayName}</Text>
        <Text className="text-base text-green-500 mb-5">@{user.login}</Text>

        {/* Level progress bar */}
        <View className="w-full px-4 mt-2">
          <View className="flex-row justify-between mb-2">
            <Text className="text-white font-medium">Level {level.toFixed(2)}</Text>
            <Text className="text-green-500">21</Text>
          </View>
          <View className="bg-gray-800 h-3 rounded-full w-full">
            <View className="bg-green-500 h-3 rounded-full" style={{ width: `${levelPercentage}%` }} />
          </View>
        </View>
      </View>

      {/* User stats */}
      <View className="flex-row flex-wrap justify-around p-5 mb-4 border-b border-gray-800">
        <View className="items-center bg-gray-900 rounded-xl p-5 w-[45%] mb-3 shadow-md">
          <Text className="text-green-500 text-xs mb-2">Wallet</Text>
          <Text className="text-white text-xl font-bold">{user.wallet} ₳</Text>
        </View>

        <View className="items-center bg-gray-900 rounded-xl p-5 w-[45%] mb-3 shadow-md">
          <Text className="text-green-500 text-xs mb-2">Evaluation Pts</Text>
          <Text className="text-white text-xl font-bold">{user.correction_point}</Text>
        </View>
      </View>

      {/* Contact Information */}
      <View className="mx-4 rounded-xl overflow-hidden mb-6 bg-gray-900 shadow-md">
        <View className="bg-gray-800 px-5 py-3 flex-row items-center">
          <IconSymbol name="envelope.fill" size={18} color="#10b981" />
          <Text className="text-white font-bold text-lg ml-2">Contact Information</Text>
        </View>

        <View className="p-5">
          <View className="flex-row justify-between items-center mb-4 pb-3 border-b border-gray-800">
            <View className="flex-row items-center">
              <IconSymbol name="envelope" size={16} color="#10b981" />
              <Text className="text-green-500 ml-2">Email</Text>
            </View>
            <Text className="text-white">{user.email}</Text>
          </View>

          {user.phone && user.phone !== "hidden" && (
            <View className="flex-row justify-between items-center mb-4 pb-3 border-b border-gray-800">
              <View className="flex-row items-center">
                <IconSymbol name="phone" size={16} color="#10b981" />
                <Text className="text-green-500 ml-2">Phone</Text>
              </View>
              <Text className="text-white">{user.phone}</Text>
            </View>
          )}

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <IconSymbol name="building.2" size={16} color="#10b981" />
              <Text className="text-green-500 ml-2">Campus</Text>
            </View>
            <Text className="text-white">{user.campus?.[0]?.name || "Unknown"}</Text>
          </View>
        </View>
      </View>

      {/* Top Projects */}
      <View className="mx-4 rounded-xl overflow-hidden mb-6 bg-gray-900 shadow-md">
        <View className="bg-gray-800 px-5 py-3 flex-row items-center">
          <IconSymbol name="star.fill" size={18} color="#10b981" />
          <Text className="text-white font-bold text-lg ml-2">Top Projects</Text>
        </View>

        <View className="p-5">
          {topProjects.length > 0 ? (
            topProjects.map((project, index) => (
              <View key={index} className={`mb-4 ${index < topProjects.length - 1 ? "pb-4 border-b border-gray-800" : ""}`}>
                <Text className="text-white font-bold text-base">{project.name}</Text>
                <View className="flex-row justify-between mt-2">
                  <View className="flex-row items-center">
                    <IconSymbol name="chart.bar" size={14} color="#10b981" />
                    <Text className="text-green-500 ml-1">Score: {project.score}</Text>
                  </View>
                  <View className={`px-2 py-1 rounded-md ${project.status === "finished" ? "bg-green-500/20" : "bg-yellow-500/20"}`}>
                    <Text className={project.status === "finished" ? "text-green-500 text-xs" : "text-yellow-500 text-xs"}>{project.status.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text className="text-white">No projects completed yet</Text>
          )}
        </View>
      </View>

      {/* Projects summary */}
      <View className="mx-4 rounded-xl overflow-hidden mb-6 bg-gray-900 shadow-md">
        <View className="bg-gray-800 px-5 py-3 flex-row items-center">
          <IconSymbol name="list.bullet" size={18} color="#10b981" />
          <Text className="text-white font-bold text-lg ml-2">Projects</Text>
        </View>

        <View className="p-5 flex-row items-center">
          <Text className="text-white text-base">{user.projects_users?.length || 0} projects completed</Text>
          <View className="ml-auto bg-green-500/20 px-3 py-1 rounded-md">
            <Text className="text-green-500 text-xs font-bold">VIEW ALL</Text>
          </View>
        </View>
      </View>

      {/* Extra padding to ensure the logout button is visible above the tab bar */}
      <View className="h-24" />
    </ScrollView>
  );
}
