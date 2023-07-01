import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/session";

function useIsLoaded() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded;
}

export default useIsLoaded;
