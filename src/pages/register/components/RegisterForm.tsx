import { Link } from "@tanstack/react-router";
import { SyntheticEvent, useState } from "react";
import FormButton from "../../../components/FormButton";
import Card from "../../../components/Card";

export default function RegisterForm() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Logging in...");
  };

  return (
    <form onSubmit={submitForm} className="flex flex-col gap-10 items-center">
      <Card>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          className="p-3 rounded rounded-xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email address</label>
        <input
          name="email"
          type="text"
          className="p-3 rounded rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          className="p-3 rounded rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Card>
      <div className="w-full flex flex-col items-center gap-3">
        <FormButton className="w-3/5">
          <strong>REGISTER</strong>
        </FormButton>
        <p>
          Already a member?{" "}
          <strong>
            <Link to="/login">Login</Link>
          </strong>
        </p>
      </div>
    </form>
  );
}
