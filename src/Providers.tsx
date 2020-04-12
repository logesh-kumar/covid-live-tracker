import React, { useEffect } from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { AuthProvider } from "./AuthProvider";
import { Routes } from "./routes";

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  useEffect(() => {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
  }, []);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
