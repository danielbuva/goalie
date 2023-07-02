import { useLocation } from "react-router-dom";

function Title() {
  const { pathname } = useLocation();

  let title = "";
  if (pathname.includes("/home")) {
    title = "Home";
  } else if (pathname.includes("/challenges")) {
    title = "Challenges";
  } else if (pathname.includes("/communities")) {
    title = "Communities";
  } else {
    title = pathname.slice(1);
  }

  return <h2 id="title">{title}</h2>;
}

export default Title;
