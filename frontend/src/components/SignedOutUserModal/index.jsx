import { useModal } from "../../hooks/useModal";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import "./index.css";

export default function SignedOutUserModal() {
  const { setContent } = useModal();

  return (
    <div>
      <h1 className="SignOutModal-header">Join Goaly</h1>
      <div className="SignOutModal-description">Log in or sign up to join today to become part of our community! Share what you wish to achieve or explore what other people are aiming for.</div>
      <div className="SignOutModal-button-wrapper">
        <button onClick={()=>setContent(<LoginForm/>)}>Log In</button>
        <button onClick={()=>setContent(<SignupForm/>)}>Sign Up</button>
      </div>
    </div>
  );
}
