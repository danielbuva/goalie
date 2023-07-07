import { useModal } from "../../hooks/useModal";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Input from "../Input";

import "./LoginForm.css";

function LoginForm() {
  const [credential, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    const data = await dispatch(login(credential, password));
    if (data) {
      for (let error of data) {
        if (error.includes("email")) {
          setCredentialError(error);
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
    setCredentialError("");
    setPasswordError("");
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setCredentialError("");
    setPasswordError("");
    setPassword(e.target.value);
  };

  const DemoUser = e => {
    e.preventDefault();
    dispatch(login("bradthedad@gmail.com", "password" ));
    closeModal();
  }

  return (
    <div className="login">
      <h2 id="login-header">Log in</h2>
      <div className="form-input">
        <Input
          autoComplete="email"
          placeholder="Email or Username"
          value={credential}
          onChange={handleCredentials}
          error={credentialError}
          required
        />
        {credentialError && <p className="error">{credentialError}</p>}
      </div>
      <div className="form-input">
        <Input
          autoComplete="current-password"
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
      <div className="demo-user" onClick={DemoUser}>
        Demo User
      </div>
    </div>
  );
}

export default LoginForm;
