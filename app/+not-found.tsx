import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function NotFound() {
  return (
    <View className="flex-1 items-center justify-center bg-black pt-16 space-y-4">
      <Text className="text-2xl font-bold text-white">404</Text>
      <Text className="text-white">This screen does not exist.</Text>
      <Link href="/">
        <Text className="text-white">Go to home screen!</Text>
      </Link>
    </View>
  );
}