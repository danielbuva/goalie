import { useSelector } from "react-redux";

function useSessionUser() {
  return useSelector((state) => state.session.user);
}

export default useSessionUser;
