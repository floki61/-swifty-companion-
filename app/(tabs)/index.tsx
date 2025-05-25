import { Text, View } from "react-native";

export default function Index() {
  console.log("Index");
  return (
    <View className="flex-1 items-center justify-center bg-red-500 pt-16">
      <Text className="text-2xl font-bold">Hello</Text>
    </View>
  );
}
