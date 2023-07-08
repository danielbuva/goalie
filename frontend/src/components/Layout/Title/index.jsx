import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Arrow from "../../icons/Arrow";

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
  if (pathname.includes(user?.id)) {
    title = user.name;
  } else if (pathname.includes("/home")) {
    title = "Home";
  } else if (pathname.includes("/challenges")) {
    title = "Challenges";
  } else if (pathname.includes("/communities")) {
    title = "Communities";
  }

  return (
    <div id="title" onClick={() => window.scrollTo(0, 0)}>
      {title !== "Home" && (
        <button onClick={handleGoBack} id="back-button">
          <Arrow />
        </button>
      )}
      <h2 id="">{title}</h2>
    </div>
  );
}

export default Title;
