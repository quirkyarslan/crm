"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSession } from "@/store/auth.store";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen for session changes
    const handleSessionChange = (session: any) => {
      dispatch(setSession(session));
    };

    // Subscribe to session changes
    window.addEventListener("storage", (e) => {
      if (e.key === "next-auth.session-token") {
        handleSessionChange(e.newValue);
      }
    });

    return () => {
      window.removeEventListener("storage", handleSessionChange);
    };
  }, [dispatch]);

  return <SessionProvider basePath="/api/auth">{children}</SessionProvider>;
};

export default AuthProvider;
