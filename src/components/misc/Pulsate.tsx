"use client";

import { useEffect, useState } from "react";

interface PulsateProps {
  children: React.ReactNode;
  transition?: number;
  period?: number;
}

const Pulsate = ({
  period = 800,
  transition = 300,
  children,
}: PulsateProps) => {
  const [scale, setScale] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale(!scale);
    }, period);
    return () => clearInterval(interval);
  }, [period, scale]);

  return (
    <div
      style={{
        transform: `scale(${scale ? "100%, 100%" : "101.4%, 102.8%"})`,
        transition: `transform ${transition}ms cubic-bezier(0.65, 0, 0.36, 1)`,
      }}
    >
      {children}
    </div>
  );
};

export default Pulsate;
