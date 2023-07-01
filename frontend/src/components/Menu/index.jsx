import { useEffect, useRef, useState } from "react";

export function Menu({ children, isOpen, menuRef }) {
  if (!isOpen) return null;

  return (
    <div ref={menuRef} className="menu">
      {children}
    </div>
  );
}

export function MenuItem({ icon, text, onClick }) {
  return (
    <div className="menu-item" onClick={onClick}>
      {icon}
      {text}
    </div>
  );
}

export function useMenu() {
  const [show, setShow] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShow(!show);
  };

  const hideMenu = () => {
    setShow(false);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return { buttonRef, hideMenu, toggleMenu, show, menuRef };
}
