import * as Linking from "expo-linking";
import { Stack } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import "../global.css";

// Make sure the browser can complete the authentication session
WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {
  useEffect(() => {
    // Log the URL scheme prefix for debugging
    console.log("App deep link prefix:", Linking.createURL(""));

    // Listen for incoming deep links
    const subscription = Linking.addEventListener("url", (event) => {
      console.log("Deep link received:", event.url);

      // You could add handling for the code parameter here if needed
      if (event.url.includes("code=")) {
        const code = event.url.split("code=")[1]?.split("&")[0];
        console.log("Authorization code from deep link:", code);
      }
    });

    // Clean up listener when component unmounts
    return () => subscription.remove();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
