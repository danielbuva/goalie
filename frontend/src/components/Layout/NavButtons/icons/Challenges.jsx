import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Challenges() {
  const { pathname } = useLocation();
  const user = useSelector((state)=>state.users.user);
  const isOnChallenges = pathname.includes("challenges") && !pathname.includes(user?.id);
  const d = isOnChallenges
    ? "M9.23767 17.7071C9.6282 17.3166 10.2614 17.3166 10.6519 17.7071L15.2032 22.2584C15.6069 22.6622 16.2662 22.6465 16.6502 22.224L25.6847 12.2861C25.8521 12.102 25.9448 11.8622 25.9448 11.6134V9.75429C25.9448 9.30781 25.6488 8.91543 25.2195 8.79277L22.6479 8.05804C22.514 8.01977 22.3895 7.95392 22.2825 7.86473L19.4448 5.5L15.6519 1.70711C15.0219 1.07714 15.4681 0 16.359 0H27.9448C28.4971 0 28.9448 0.447715 28.9448 1V11.6163C28.9448 11.8633 29.0362 12.1016 29.2015 12.2852L33.1881 16.7148C33.3533 16.8984 33.4448 17.1367 33.4448 17.3837V32.0074C33.4448 32.5568 33.0016 33.0033 32.4522 33.0074L1.00752 33.2419C0.421643 33.2463 -0.0424609 32.7483 0.00308873 32.1642L0.416068 26.8682C0.434598 26.6306 0.537397 26.4074 0.705935 26.2388L9.23767 17.7071Z"
    : "M9.30033 18.2071C9.69085 17.8166 10.324 17.8166 10.7145 18.2071L15.2659 22.7584C15.6696 23.1622 16.3288 23.1465 16.7129 22.724L25.7474 12.7861C25.9147 12.602 26.0074 12.3622 26.0074 12.1134V10.2543C26.0074 9.80781 25.7115 9.41543 25.2822 9.29277L22.7106 8.55804C22.5766 8.51977 22.4521 8.45392 22.3451 8.36473L19.5074 6L15.7145 2.20711C15.0846 1.57714 15.5307 0.5 16.4216 0.5H28.0074C28.5597 0.5 29.0074 0.947715 29.0074 1.5V12.1163C29.0074 12.3633 29.0989 12.6016 29.2641 12.7852L33.2507 17.2148C33.416 17.3984 33.5074 17.6367 33.5074 17.8837V32.5074C33.5074 33.0568 33.0643 33.5033 32.5149 33.5074L1.07017 33.7419C0.484296 33.7463 0.0201917 33.2483 0.0657413 32.6642L0.47872 27.3682C0.497251 27.1306 0.600049 26.9074 0.768588 26.7388L9.30033 18.2071ZM26.5074 16.7419C26.0261 17.2924 24.8952 19.2419 24.8952 19.2419L22.3451 21.6714L18.2975 26C18.0334 26.2923 15.0752 26.2793 14.7975 26L10.2975 22.5C9.79752 22 9.06608 22.7298 8.79752 23L5.79752 27C5.68161 27.1166 5.31026 28.3356 5.29752 28.5L4.79752 30C4.76619 30.4041 5.89461 30.503 6.29752 30.5H24.8952C25.273 30.4972 29.7975 30.3801 29.7975 30L29.9386 21.6714C29.9386 21.515 29.0111 18.1696 28.7975 17.5L27.5074 16.7419H26.5074ZM26 6.5L24 6L22.5 5L21 3.5C20.6526 3.18502 21.5088 3 22 3H26V6.5Z";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 34 34"
      fill="none"
    >
      <path className="icon" fillRule="evenodd" clipRule="evenodd" d={d} />
    </svg>
  );
}

export default Challenges;
