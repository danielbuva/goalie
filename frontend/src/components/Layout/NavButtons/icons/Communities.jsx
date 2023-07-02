import { useLocation } from "react-router-dom";

function Communities() {
  const { pathname } = useLocation();
  const isOnCommunities = pathname.includes("communities");

  const d = isOnCommunities
    ? "M7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-1.608 1.732-2.762 4.389-2.869 8.248l-.03 1.083zM9.616 9.27C10.452 8.63 11 7.632 11 6.5 11 4.57 9.433 3 7.5 3S4 4.57 4 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73zm6.884 1.726c-3.264 0-6.816 2.358-7 8.977L9.471 21h14.057l-.029-1.027c-.184-6.618-3.736-8.977-7-8.977zm2.116-1.726C19.452 8.63 20 7.632 20 6.5 20 4.57 18.433 3 16.5 3S13 4.57 13 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73z"
    : "M7.50098 19.917L7.47098 21H0.471985L0.500985 19.973C0.684985 13.355 4.23698 10.996 7.50098 10.996C8.46398 10.996 9.45099 11.208 10.371 11.668C9.92699 12.146 9.51999 12.698 9.15899 13.324C8.65199 13.12 8.10498 12.995 7.50098 12.995C4.73398 12.995 2.93098 15.218 2.56298 18.999H7.55998C7.53698 19.301 7.50998 19.599 7.50098 19.917ZM23.499 19.973L23.528 21H9.47198L9.50099 19.973C9.68499 13.355 13.237 10.996 16.501 10.996C19.765 10.996 23.317 13.354 23.501 19.973H23.499ZM21.437 19C21.07 15.219 19.267 12.996 16.499 12.996C13.731 12.996 11.929 15.219 11.561 19H21.437ZM16.499 10C15.7 10 14.972 9.721 14.383 9.27C13.547 8.63 12.999 7.632 12.999 6.5C12.999 4.57 14.566 3 16.499 3C18.432 3 19.999 4.57 19.999 6.5C19.999 7.632 19.451 8.63 18.615 9.27C18.026 9.721 17.298 10 16.499 10ZM14.999 6.5C14.999 7.327 15.672 8 16.499 8C17.326 8 17.999 7.327 17.999 6.5C17.999 5.673 17.326 5 16.499 5C15.672 5 14.999 5.673 14.999 6.5ZM7.49998 3C9.43298 3 11 4.57 11 6.5C11 8.43 9.43298 10 7.49998 10C5.56698 10 3.99998 8.43 3.99998 6.5C3.99998 4.57 5.56698 3 7.49998 3ZM7.49998 5C6.67298 5 5.99998 5.673 5.99998 6.5C5.99998 7.327 6.67298 8 7.49998 8C8.32698 8 8.99998 7.327 8.99998 6.5C8.99998 5.673 8.32698 5 7.49998 5Z";
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className="icon" d={d}></path>
    </svg>
  );
}

export default Communities;