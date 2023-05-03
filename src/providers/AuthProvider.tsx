"use client";

import CircularProgress from "@/components/CircularProgress";
import supabase from "@/libs/supabase";
import { User } from "@supabase/supabase-js";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);

  const signOut = useCallback(async () => {
    setShowLoadingPopup(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Failed to sign out", error);
    }
    setShowLoadingPopup(false);
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      setIsLoading(false);
    });
    return subscription.unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>
      {children}
      {showLoadingPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="z-50 flex h-20 w-20 items-center justify-center rounded-xl bg-white">
            <CircularProgress />
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}
