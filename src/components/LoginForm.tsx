import { Link } from "@tanstack/react-router";
import { useState } from "react";
import FormButton from "./FormButton";

export default function LoginForm() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const submitForm = () => {
    console.log("Logging in...");
  };

  return (
    <div>
      <form
        onSubmit={submitForm}
        className="card bg-background text-black p-10"
      >
        <label htmlFor="email">Email address</label>
        <input
          name="email"
          type="text"
          className="p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          className="p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <FormButton onClick={submitForm}>Login</FormButton>
      <p>
        Not a member? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
