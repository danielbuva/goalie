import { redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { signUp } from "../../store/session";
import useSessionUser from "../../hooks/useSessionUser";

import Input from "../Input";

import "./SignupForm.css";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const currentUser = useSessionUser();
  const dispatch = useDispatch();

  if (currentUser) return redirect("/home");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
    const data = dispatch(
      signUp({ email, firstName, lastName, password, username })
    );
    if (data) {
      setErrors(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup">
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
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        placeholder="First name"
        value={username}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <Input
        placeholder="Last name"
        value={username}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
