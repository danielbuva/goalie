export default function Tabs({ children }) {
  return <div>{children}</div>;
}

export function Tab({ text, cb }) {
  return <div onClick={cb}>{text}</div>;
}

export function TabIndicator() {
  return <div></div>;
}

export function TabList({ children }) {
  return <div>{children}</div>;
}

export function TabPanels({ children }) {
  return <div>{children}</div>;
}
