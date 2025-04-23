import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (user?.role === "User") return <Navigate to={"/"} replace />;

  return <>{children}</>;
}
