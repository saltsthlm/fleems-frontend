import LoginForm from "./components/LoginForm";
import Logo from "../../components/Logo";
import PageWithNavigation from "../../components/PageWithNavigation";

export default function LoginPage() {
  return (
    <PageWithNavigation showNav={false}>
      <Logo />
      <LoginForm />
    </PageWithNavigation>
  );
}
