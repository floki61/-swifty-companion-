import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

import AuthGuard from "@/components/AuthGuard";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";

export default function TabLayout() {
  return (
    <AuthGuard>
      <View className="flex-1 bg-black pt-24">
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#10b981",
            tabBarInactiveTintColor: "#a3a3a3",
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#000000",
              borderTopWidth: 0,
              paddingTop: 10,
              paddingBottom: 20,
              height: 80,
              position: "absolute",
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />,
            }}
          />
          <Tabs.Screen
            name="projects"
            options={{
              title: "Projects",
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
            }}
          />
        </Tabs>
      </View>
    </AuthGuard>
  );
}
