import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../AuthProvider";
import { useEffect, useState } from "react";

export default function ProfileButton() {
  const { profile, isLoggedIn } = useAuth();
  const [profilePic, setProfilePic] = useState(null);
  console.log("hi in profile" + profile);

  useEffect(() => {
    setProfilePic(profile?.picture);
  }, [profile]);

  return (
    <Link to="/profile">
      {isLoggedIn ? (
        <img src={profilePic} alt="user image" />
      ) : (
        <Icon icon="gg:profile" className="h-full" />
      )}
    </Link>
  );
}
