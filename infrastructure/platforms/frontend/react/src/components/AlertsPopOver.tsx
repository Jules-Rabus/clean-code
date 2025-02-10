// components/AlertsPopover.tsx
"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const partSchema = z.object({
  identifier: z.string(),
  reference: z.string(),
  name: z.string(),
  description: z.string(),
  stockQuantity: z.number(),
  minStockLevel: z.number(),
  price: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const alertSchema = z.object({
  title: z.string(),
  description: z.string(),
  part: partSchema,
  identifier: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const alertsSchema = z.array(alertSchema);

export type AlertType = z.infer<typeof alertSchema>;

export function AlertsPopover() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAlerts() {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const port = parseInt(localStorage.getItem("port") || "3001", 10);
        const res = await fetch(`${baseUrl}:${port}/alerts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des alertes");
        const data = await res.json();
        const parsed = alertsSchema.safeParse(data);
        if (!parsed.success) {
          console.error("Validation des alertes échouée", parsed.error);
          setAlerts([]);
        } else {
          setAlerts(parsed.data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des alertes :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAlerts();
  }, [baseUrl]);

  if (!localStorage.getItem("token")) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2">
          <Bell className="w-6 h-6" />
          {alerts.length > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        {loading ? (
          <p>Chargement des alertes...</p>
        ) : alerts.length === 0 ? (
          <p>Aucune alerte à afficher.</p>
        ) : (
          alerts.map((alert) => (
            <Alert key={alert.identifier} className="mb-2">
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>
                {alert.description}
                <br />
                Pièce : {alert.part.name} ({alert.part.reference})
                <br />
                Créé le : {new Date(alert.createdAt).toLocaleString()}
              </AlertDescription>
            </Alert>
          ))
        )}
      </PopoverContent>
    </Popover>
  );
}
