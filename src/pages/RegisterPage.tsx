import Logo from "../components/Logo";
import PageWithNavigation from "../components/PageWithNavigation";

export default function RegisterPage() {
  return (
    <PageWithNavigation showNav={false}>
      <Logo />
      <h1>Register</h1>
    </PageWithNavigation>
  );
}
