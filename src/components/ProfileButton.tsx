import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../AuthProvider";
import { useEffect, useState } from "react";
import { PropsWithClassName } from "../types/ComponentTypes";
import useScreenType from "../hooks/useScreenType";

export default function ProfileButton({ className }: PropsWithClassName) {
  const { isMobile } = useScreenType();
  const { profile, isLoggedIn } = useAuth();
  const [profilePic, setProfilePic] = useState(null);
  console.log("hi in profile" + profile);

  useEffect(() => {
    setProfilePic(profile?.picture);
  }, [profile]);

  return (
    <Link to="/profile" className={`${className}`}>
      {isLoggedIn ? (
        <img src={profilePic ?? ""} alt="user image" className={`rounded-full ${isMobile ? "h-8" : "h-12"}`} />
      ) : (
        <Icon icon="gg:profile" className="h-full [&>g]: text-red" />
      )}
    </Link>
  );
}
