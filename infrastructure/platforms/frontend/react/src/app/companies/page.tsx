"use client";

import { useEffect, useState } from "react";
import { Company } from "@/types";
import CompanyCard from "@/components/company/CompanyCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function CompaniesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    async function fetchCompanies() {
      try {
        const port = parseInt(localStorage.getItem("port") || "3001", 10);
        const res = await fetch(`${baseUrl}:${port}/companies`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des données");
        const data = await res.json();
        setCompanies(data);
      } catch (error) {
        console.error("Erreur lors du chargement des compagnies :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCompanies();
  }, [baseUrl]);

    const handleDeleteCompany = (identifier: string) => {
        setCompanies((prevCompanies) => prevCompanies.filter((company) => company.identifier !== identifier));
    };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Liste des Compagnies</h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Skeleton className="h-10 w-10" />
        </div>
      ) : companies.length === 0 ? (
        <p className="text-lg">Aucune compagnie trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company.identifier} company={company} onDelete={handleDeleteCompany} />
          ))}
        </div>
      )}
    </div>
  );
}
