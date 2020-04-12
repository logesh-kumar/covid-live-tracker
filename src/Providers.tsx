import React from "react";
import { AuthProvider } from "./AuthProvider";
import { Routes } from "./routes";

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
