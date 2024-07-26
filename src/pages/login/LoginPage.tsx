import Logo from "../../components/Logo";
import PageWithNavigation from "../../components/PageWithNavigation";
import LoginFormGoogle from "./components/LoginFormGoogle";

export default function LoginPage() {
  return (
    <PageWithNavigation showNav={false}>
      <Logo className="p-10 mx-auto"/>
      <LoginFormGoogle />
    </PageWithNavigation>
  );
}
