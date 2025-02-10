"use client";
import { useRouter } from "next/navigation";
import BikeForm, { BikeFormData } from "@/forms/BikeForm";

export default function NewBikePage() {
    const router = useRouter();

    const handleBikeSubmit = async (data: BikeFormData) => {
        try {
            const port = parseInt(localStorage.getItem("port") || "3001", 10);
            const response = await fetch(`http://localhost:${port}/bikes`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                },
                
                body: JSON.stringify(data),
            });
            if (response.ok) {
                router.push("/bikes");
            } else {
                console.error("Erreur lors de la création de la moto");
            }
        } catch (error) {
            console.error("Erreur lors de la création de la moto:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Ajouter une Moto</h1>
            <BikeForm onSubmit={handleBikeSubmit} />
        </div>
    );
}
