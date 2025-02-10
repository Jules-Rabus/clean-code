// pages/maintenances.tsx
"use client";

import { useEffect, useState } from "react";
import { Maintenance } from "@/types";
import MaintenanceCard from "@/components/maintenance/MaintenanceCard";
import CreateMaintenanceForm from "@/components/maintenance/CreateMaintenanceForm";
import { Skeleton } from "@/components/ui/skeleton";

export default function MaintenancesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fonction pour récupérer les maintenances via l'API
  const fetchMaintenances = async () => {
    setLoading(true);
    try {
      const port = parseInt(localStorage.getItem("port") || "3001", 10);
      const res = await fetch(`${baseUrl}:${port}/maintenances`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!res.ok) throw new Error("Erreur lors de la récupération des données");
      const data = await res.json();
      setMaintenances(data);
    } catch (error) {
      console.error("Erreur lors du chargement des maintenances :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenances();
  }, [baseUrl]);

  // Callback pour suppression
  const handleDeleteMaintenance = (identifier: string) => {
    setMaintenances((prev) => prev.filter((maintenance) => maintenance.identifier !== identifier));
  };

  // Callback pour mise à jour
  const handleUpdateMaintenance = (updatedMaintenance: Maintenance) => {
    setMaintenances((prev) =>
      prev.map((maintenance) =>
        maintenance.identifier === updatedMaintenance.identifier ? updatedMaintenance : maintenance
      )
    );
  };

  // Callback pour création : relancer la récupération complète
  const handleCreateMaintenance = (createdMaintenance: Maintenance) => {
    fetchMaintenances();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Liste des Maintenances</h1>
      {/* Formulaire de création */}
      <CreateMaintenanceForm onCreate={handleCreateMaintenance} />
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Skeleton className="h-10 w-10" />
        </div>
      ) : maintenances.length === 0 ? (
        <p className="text-lg">Aucune maintenance trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maintenances.map((maintenance) => (
            <MaintenanceCard
              key={maintenance.identifier}
              maintenance={maintenance}
              onDelete={handleDeleteMaintenance}
              onUpdate={handleUpdateMaintenance}
            />
          ))}
        </div>
      )}
    </div>
  );
}
