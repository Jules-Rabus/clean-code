// pages/incidents.tsx
"use client";

import { useEffect, useState } from "react";
import { Incident } from "@/types";
import IncidentCard from "@/components/incident/IncidentCard";
import CreateIncidentForm from "@/components/incident/CreateIncidentForm";
import { Skeleton } from "@/components/ui/skeleton";

export default function IncidentsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(`${baseUrl}:${port}/incidents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la récupération des données");
      const data = await res.json();
      setIncidents(data);
    } catch (error) {
      console.error("Erreur lors du chargement des incidents :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [baseUrl]);

  const handleDeleteIncident = (identifier: string) => {
    setIncidents((prev) => prev.filter((incident) => incident.identifier !== identifier));
  };

  const handleUpdateIncident = (updatedIncident: Incident) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.identifier === updatedIncident.identifier ? updatedIncident : incident
      )
    );
  };

  const handleCreateIncident = (createdIncident: Incident) => {
    fetchIncidents();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Liste des Incidents</h1>
      {/* Formulaire de création */}
      <CreateIncidentForm onCreate={handleCreateIncident} />
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Skeleton className="h-10 w-10" />
        </div>
      ) : incidents.length === 0 ? (
        <p className="text-lg">Aucun incident trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incidents.map((incident) => (
            <IncidentCard
              key={incident.identifier}
              incident={incident}
              onDelete={handleDeleteIncident}
              onUpdate={handleUpdateIncident}
            />
          ))}
        </div>
      )}
    </div>
  );
}
