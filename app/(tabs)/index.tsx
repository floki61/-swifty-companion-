import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-black pt-16">
      <Text className="text-2xl font-bold text-white">Welcome to 42 Companion</Text>
      <Text className="text-white mt-4">You are authenticated!</Text>
    </View>
  );
}
