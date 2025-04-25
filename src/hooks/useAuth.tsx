import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "client" | "freelancer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "student" | "client") => Promise<boolean>;
  register: (userData: any, role: "student" | "client") => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const storedUser = localStorage.getItem("skillhive-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("skillhive-user");
      }
    }
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string, role: "student" | "client"): Promise<boolean> => {
    setLoading(true);
    try {
      const loginFn = role === "student" ? api.studentLogin : api.clientLogin;
      const userData = await loginFn({ email, password });
      
      setUser(userData);
      localStorage.setItem("skillhive-user", JSON.stringify(userData));
      
      toast({
        title: "Login successful!",
        description: `Welcome back, ${userData.name}!`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (userData: any, role: "student" | "client"): Promise<boolean> => {
    setLoading(true);
    try {
      const registerFn = role === "student" ? api.registerStudent : api.registerClient;
      await registerFn(userData);
      
      toast({
        title: "Registration successful!",
        description: "You can now log in with your credentials.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Registration error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("skillhive-user");
    toast({
      title: "Logged out successfully",
    });
  };
  
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
