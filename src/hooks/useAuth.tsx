
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

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
    // Check for stored user on mount
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
  
  // For demo purposes, we'll use mock data
  const mockStudents = [
    { id: 1, name: "John Doe", email: "student@example.com", password: "password", role: "student" },
    { id: 2, name: "Jane Smith", email: "freelancer@example.com", password: "password", role: "freelancer" }
  ];
  
  const mockClients = [
    { id: 1, name: "Acme Corp", email: "client@example.com", password: "password", role: "client" }
  ];
  
  const login = async (email: string, password: string, role: "student" | "client"): Promise<boolean> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Check mock data
      const userList = role === "student" ? mockStudents : mockClients;
      const foundUser = userList.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Remove password before storing
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword as User);
        localStorage.setItem("skillhive-user", JSON.stringify(userWithoutPassword));
        toast({
          title: "Login successful!",
          description: `Welcome back, ${foundUser.name}!`,
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  const register = async (userData: any, role: "student" | "client"): Promise<boolean> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Create a new mock user
      const newUser = {
        id: Math.floor(Math.random() * 1000),
        ...userData,
        role: role === "student" ? "student" : "client"
      };
      
      // Simulate successful registration
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
