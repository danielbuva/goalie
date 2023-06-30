import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useColorMode } from "../hooks/useTheme";

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const flagColors = ["#EF3E2E", "#222DA1", "#ACFC3C", "#FF86E0"];

const GoalieLogo = () => {
  const [index, setIndex] = useState(
    parseInt(localStorage.getItem("logo")) ?? 0
  );

  const poleColor = useColorMode("#000000", "#D9DBD6");

  const onClick = () => {
    const randomIndex = randomInt(0, 3);
    setIndex(randomIndex);
    localStorage.setItem("logo", randomIndex.toString());
  };

  return (
    <NavLink to="/home" onClick={onClick}>
      <div id="goalie">
        <svg
          width="30"
          height="30"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50.7453 78.4143C38.7497 70.4716 40.7099 52.3019 54.1235 47.1004L75.4717 41.944L98.1363 36.1808L120.543 31.7075L143.988 28.5656L164.535 25.2352C164.88 25.1793 164.839 24.6714 164.49 24.6714C164.337 24.6714 164.211 24.7929 164.206 24.946L160.939 126.744C160.872 128.814 162.025 130.732 163.884 131.645L136.686 121.365L114.09 111.553L96.0063 102.534L73.869 91.8711L53.0689 79.9529L50.7453 78.4143Z"
            fill={flagColors[index]}
          />
          <rect
            x="164.178"
            width="38.5515"
            height="228.175"
            rx="19.2757"
            transform="rotate(1.68264 164.178 0)"
            fill={poleColor}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M135.886 161.277C113.952 166.136 92.2505 199.707 94.683 224.418C94.683 266.161 130.875 300 175.521 300C220.166 300 256.358 266.161 256.358 224.418C256.358 200.071 237.545 161.423 214.411 164.475L213.547 193.942C220.894 202.097 225.325 212.646 225.325 224.168C225.325 250.015 203.027 270.968 175.521 270.968C148.015 270.968 125.717 250.015 125.717 224.168C125.717 214.113 129.091 204.799 134.833 197.171L135.886 161.277Z"
            fill={poleColor}
          />
          <path
            d="M241.092 182.448C241.092 193.091 235.718 198.215 225.075 198.215C214.432 198.215 205.804 189.587 205.804 178.944C205.804 168.301 213.312 159.173 226.326 166.681C221.821 192.209 241.092 171.805 241.092 182.448Z"
            fill={poleColor}
          />
          <path
            d="M117.916 186.675C121.201 196.798 122.851 202.501 132.975 199.216C139.482 193.46 153.685 182.575 150.401 172.451C147.116 162.328 137.158 155.962 127.096 167.12C139.259 190.011 114.632 176.551 117.916 186.675Z"
            fill={poleColor}
          />
        </svg>
      </div>
    </NavLink>
  );
};

export default GoalieLogo;
