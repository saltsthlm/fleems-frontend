import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../AuthProvider";
import { PropsWithClassName } from "../types/ComponentTypes";
import useScreenType from "../hooks/useScreenType";

export default function ProfileButton({ className }: PropsWithClassName) {
  const { isMobile } = useScreenType();
  const { profile, isLoggedIn } = useAuth();

  return (
    <Link to="/profile" className={`${className}`}>
      {isLoggedIn && profile ? (
        <img
          src={profile.picture}
          alt="user image"
          className={`rounded-full ${isMobile ? "h-8" : "h-12"}`}
        />
      ) : (
        <Icon icon="gg:profile" className="h-full [&>g]: text-red" />
      )}
    </Link>
  );
}
