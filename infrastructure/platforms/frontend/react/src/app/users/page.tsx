"use client";

import { useEffect, useState } from "react";
import { User } from "@/types";
import UserCard from "@/components/user/UserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { set } from "zod";

export default function UsersPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    async function fetchUsers() {
      try {
        const port = parseInt(localStorage.getItem("port") || "3001", 10);
        const res = await fetch(`${baseUrl}:${port}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des données");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [baseUrl]);

    const handleDeleteUser = (identifier: string) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.identifier !== identifier));
    };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Liste des Utilisateurs</h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Skeleton className="h-10 w-10" />
        </div>
      ) : users.length === 0 ? (
        <p className="text-lg">Aucun utilisateur trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user.identifier} user={user} onDelete={handleDeleteUser} />
          ))}
        </div>
      )}
    </div>
  );
}
