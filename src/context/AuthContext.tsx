import { createContext, useEffect, useState, ReactNode } from "react";
import apiRequest from "../lib/apiRequest";

interface User {
  id?: string;
  password?: string;
  email?: string;
  token: string;
}

interface AuthContextType {
  currentUser: User | null;
  updateUser: (data: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const updateUser = (data: User | null) => {
    console.log("response from context ", data);
    setCurrentUser(data);
    
    if (data) {
      // Store the user and token in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("authToken", data.token); // Store token separately for easy access
    } else {
      // Remove the user and token from localStorage on logout or error
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest.get("/health");
        console.log("API response status:", res.status);

        if (res.status === 200 && currentUser) {
          // Update user data in localStorage after health check
          localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("authToken"); // Clean up the token if the health check fails
        }
      } catch (error) {
        console.error("Error fetching health status:", error);
        // Handle error case, possibly remove user and token if needed
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
      }
    };

    fetchData();
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
