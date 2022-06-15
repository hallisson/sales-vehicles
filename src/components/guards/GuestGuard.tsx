import * as React from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

interface GuestGuardType {
  children: React.ReactNode;
}

// For routes that can only be accessed by unauthenticated users
function GuestGuard({ children }: GuestGuardType) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default GuestGuard;
