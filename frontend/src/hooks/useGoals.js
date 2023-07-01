import { useSelector } from "react-redux";

export default function useGoals() {
  return useSelector((state) => state.goals.goals);
}
