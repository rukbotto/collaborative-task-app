import React, { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    async function prepare() {
      try {
        // Simulate a loading process (e.g., fetching resources)
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (error) {
        console.warn(error);
      } finally {
        // Hide the splash screen once the app is ready
        SplashScreen.hideAsync();
      }
    }

    prepare()
  }, []);

  return <Stack />;
}
