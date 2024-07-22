import LoginForm from "../components/LoginForm";
import PageWithNavigation from "../components/PageWithNavigation";

export default function LoginPage() {
  return (
    <PageWithNavigation showNav={false}>
      <LoginForm />
    </PageWithNavigation>
  );
}
