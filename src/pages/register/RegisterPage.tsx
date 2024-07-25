import Logo from "../../components/Logo";
import PageWithNavigation from "../../components/PageWithNavigation";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <PageWithNavigation showNav={false}>
      <Logo />
      <RegisterForm />
    </PageWithNavigation>
  );
}
