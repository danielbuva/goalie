import { useSelector } from "react-redux";

export default function useChallenge() {
  return useSelector((state) => state.challenges.challenges);
}
