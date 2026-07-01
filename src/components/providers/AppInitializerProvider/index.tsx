import React, { useEffect } from "react";

import { initDB } from "@/services/database";

interface AppInitializerProviderProps {
  children: React.ReactNode;
}

export default function AppInitializerProvider({
  children,
}: AppInitializerProviderProps) {
  useEffect(() => {
    initDB();
  }, []);

  return <>{children}</>;
}
