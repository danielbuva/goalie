import { useModal } from "../../hooks/useModal";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";

export default function SignedOutUserModal() {
  const { setContent} = useModal();

  return (
    <div>
      <h1>Join Goaly</h1>
      <h2>Log in or sign up to join today.</h2>
      <button onClick={()=>setContent(<LoginForm/>)}>Log In</button>
      <button onClick={()=>setContent(<SignupForm/>)}>Sign Up</button>
    </div>
  );
}
