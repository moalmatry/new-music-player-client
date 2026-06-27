import { Redirect } from "expo-router";
import React from "react";

import { useAuthStore } from "@/store/useAuthStore";

export default function IndexScreen() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}
