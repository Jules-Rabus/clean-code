"use client";

import { Button } from "@/components/ui/button";

interface PortToggleProps {
  port: number;
  onToggle: () => void;
}

export function PortToggle({ port, onToggle }: PortToggleProps) {
  return (
    <div className="flex flex-col items-center">
      <Button onClick={onToggle} className="mb-2">
        Utiliser le port {port === 3000 ? 3001 : 3000}
      </Button>
      <p className="mb-4">Port actuel : {port}</p>
    </div>
  );
}
