import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Title() {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.users.user);

  let title = "";

  if (pathname.includes("/home")) {
    title = "Home";
  } else if (pathname.includes("/challenges")) {
    title = "Challenges";
  } else if (pathname.includes("/communities")) {
    title = "Communities";
  } else {
    title = user.name;
  }

  return <h2 id="title">{title}</h2>;
}

export default Title;
