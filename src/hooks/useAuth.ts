import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw "useAuth must use inside a AuthProvider";

  return context;
};
