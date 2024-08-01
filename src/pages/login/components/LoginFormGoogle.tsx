import FormButton from "../../../components/FormButton";
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "@tanstack/react-router";
import Throbber from "../../../components/Throbber";
import { useAuth } from "../../../AuthProvider";
import Card from "../../../components/Card";

export default function LoginFormGoogle() {
  const navigate = useNavigate({ from: "/login" });
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useAuth();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(null);
      setUser(codeResponse);
      console.log("codeResponse; " + codeResponse);
      navigate({ to: "/" });
    },
    onError: (error) => alert("Login Failed:" + error),
  });

  return (
    <>
      {loading ? (
        <Throbber />
      ) : (
        <>
          <Card className="w-2/3 mx-auto">
            <h1 className="text-center m-4 text-lg">
              Login with Google <br />
              to access your Fleems account
            </h1>

            <FormButton
              className="w-1/3 mx-auto flex"
              onClick={() => {
                setLoading(true);
                login();
              }}
            >
              <strong>LOGIN</strong>
            </FormButton>
          </Card>
        </>
      )}
    </>
  );
}
