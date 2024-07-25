import { googleLogout } from "@react-oauth/google";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

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

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const [user, setUser] = useState();
  const [profile, setProfile] = useState(null);
  const [credential, setCredential] = useState(null);

  const saveUser = (jwt?: string) => {
    if (jwt == null) {
      return null;
    }
    setIsLoggedIn(true);
    setCredential(jwt);
    const userData = jwtDecode(jwt);
    setProfile(userData);
    return userData;
  };

  useEffect(() => {
    console.log("in auth provider" + profile);
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
    setUser(null);
    setIsLoggedIn(false);
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
