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
    title = "dani";
  }

  return <>{title}</>;
}

export default Title;