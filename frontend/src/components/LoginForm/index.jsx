import { useModal } from "../../hooks/useModal";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Input from "../Input";

import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    const data = await dispatch(login(email, password));
    if (data) {
      for (let error of data) {
        if (error.includes("email")) {
          setEmailError(error);
        }
        if (error.includes("password")) {
          setPasswordError(error);
        }
      }
    } else {
      closeModal();
    }
  };

  const handleCredentials = (e) => {
    setEmailError("");
    setPasswordError("");
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setEmailError("");
    setPasswordError("");
    setPassword(e.target.value);
  };

  return (
    <div className="login">
      <h2 id="login-header">Log in</h2>
      <div className="form-input">
        <Input
          placeholder="Email"
          value={email}
          onChange={handleCredentials}
          error={emailError}
          required
        />
        {emailError && <p className="error">{emailError}</p>}
      </div>
      <div className="form-input">
        <Input
          placeholder="Password"
          value={password}
          onChange={handlePassword}
          error={passwordError}
          required
        />
        {passwordError && <p className="error">{passwordError}</p>}
      </div>
      <button type="submit" onClick={handleSubmit} id="login-button">
        Log In
      </button>
    </div>
  );
}

export default LoginForm;
