import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BackArrow from "./BackArrow";

function Title() {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.users.user);
  const hasHistory = sessionStorage.getItem("hasVisited");
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.getSelection().empty();
    if (!hasHistory) {
      sessionStorage.setItem("hasVisited", "true");
      navigate("/home");
    } else {
      navigate(-1);
    }
  };

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

  return (
    <div id="title">
      {title !== "Home" && (
        <button onClick={handleGoBack} id="back-button">
          <BackArrow />
        </button>
      )}
      <h2 id="">{title}</h2>
    </div>
  );
}

export default Title;
