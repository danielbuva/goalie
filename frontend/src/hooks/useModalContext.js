import { useContext } from "react";
import { ModalContext } from "../components/Modal";

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "Modal.* component muse be rendered as a child of Tile component"
    );
  }
  return context;
}
