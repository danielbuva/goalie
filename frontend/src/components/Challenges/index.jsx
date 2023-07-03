import { useSelector, useDispatch } from "react-redux";

export default function Challenges() {
  const dispatch = useDispatch();
  const allChallenges = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.user);

  if (Object.keys(allChallenges).length) {
    return null;
  }
  return <div>{user && <div></div>}</div>;
}
