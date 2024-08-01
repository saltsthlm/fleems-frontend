import { googleLogout } from "@react-oauth/google";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { JwtPayload } from "jwt-decode";
import { ReactNode } from "@tanstack/react-router";

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  setUser: (thing: any) => {},
  profile: null,
  login: () => {},
  logout: () => {},
  saveUser: (thing: any) => {},
  credential: null,
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const [user, setUser] = useState<User | null>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [credential, setCredential] = useState<string | null>("");

  type Profile = {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    hd: string;
  };

  type User = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    authuser: string;
    hd: string;
    prompt: string;
  };

  const saveUser = (jwt?: string) => {
    if (jwt == null) {
      return null;
    }
    setIsLoggedIn(true);
    setCredential(jwt);
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setProfile(null);
    setUser(null);
    setIsLoggedIn(false);
    setCredential(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logout,
        user,
        setUser,
        saveUser,
        profile,
        credential,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
