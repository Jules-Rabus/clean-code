"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PortToggleProps {
  onPortChange?: (newPort: number) => void;
}

export function PortToggle({ onPortChange }: PortToggleProps) {
  const [port, setPort] = useState<number>(3001);

  useEffect(() => {
    const storedPort = localStorage.getItem("port");
    if (storedPort) {
      const parsedPort = parseInt(storedPort, 10);
      setPort(parsedPort);
      onPortChange && onPortChange(parsedPort);
    }
  }, [onPortChange]);

  const togglePort = () => {
    const newPort = port === 3001 ? 3002 : 3001;
    setPort(newPort);
    localStorage.setItem("port", newPort.toString());
    onPortChange && onPortChange(newPort);
  };

  return (
    <div className="flex flex-col items-center">
      <Button onClick={togglePort} className="mb-2">
        Utiliser le port {port === 3001 ? 3002 : 3001}
      </Button>
      <p className="mb-4">Port actuel : {port}</p>
    </div>
  );
}
