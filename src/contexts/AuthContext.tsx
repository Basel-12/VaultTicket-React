import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type UserType = {
  username: string;
  role: string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout: () => void;
  refreshAccessToken: () => void;
  user: UserType | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState<UserType | undefined>();

  const navigate = useNavigate();

  const logout = useCallback(() => {
    setisAuthenticated(false);
    setUser(undefined);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/login");
  }, [navigate]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const res = await axios.post("/api/Auth/refresh-token", {
        token,
        refreshToken: localStorage.getItem("refresh"),
        username: user?.username || "",
      });

      setTokens(res.data.token, res.data.refreshToken);
    } catch (err: any) {
      if (err.response.data === "Invalid or expired refresh token.") logout();
    }
  }, [token, user?.username, logout]);

  useEffect(() => {
    const intializeAuth = async () => {
      if (token) {
        if (!isValidToken(token)) {
          console.log("access token expired");
          await refreshAccessToken();
        } else {
          setisAuthenticated(true);
          decodeandSetUser(token);
        }
      }
    };
    intializeAuth();
  }, [navigate, token, refreshAccessToken]);

  const isValidToken = (token: string) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) return false;
      return decoded.exp * 1000 > Date.now();
    } catch (err) {
      return false;
    }
  };

  const decodeandSetUser = (token: string) => {
    if (!token) setUser(null);
    try {
      const decoded = jwtDecode(token);
      setUser({
        username:
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const setTokens = (token: string, refreshToken: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refreshToken);
    setToken(token);
  };

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post("/api/Auth/login", {
        username,
        password,
      });

      setTokens(res.data.token, res.data.refreshToken);
      setisAuthenticated(true);
      decodeandSetUser(res.data.token);
      navigate("/", { replace: true });
    } catch (err: any) {
      toast.error(`${err.response.data}`);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const res = await axios.post("/api/Auth/register", {
        username,
        password,
        role: "User",
      });
      navigate("/login");
      toast.success("please login with your account");
    } catch (err: any) {
      toast.error(`${err.response.data}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
