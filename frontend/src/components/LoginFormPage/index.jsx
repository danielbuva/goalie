import { redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { login } from "../../store/session";

import useSessionUser from "../../hooks/useSessionUser";

import Input from "../Input";

import "./LoginForm.css";

function LoginFormPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSessionUser();

  if (currentUser) return redirect("/home");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="login">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Password"
          value={email}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
