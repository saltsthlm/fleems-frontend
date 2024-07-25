import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "@tanstack/react-router";

export default function ProfileButton() {
  return (
    <Link to="/profile">
      <Icon icon="gg:profile" className="h-full" />
    </Link>
  );
}
