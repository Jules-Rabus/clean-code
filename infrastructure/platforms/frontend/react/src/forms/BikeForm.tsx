"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schéma de validation avec Zod
const bikeFormSchema = z.object({
    vin: z.string().min(1, { message: "Le VIN est requis." }),
    brand: z.string().min(1, { message: "La marque est requise." }),
    model: z.string().min(1, { message: "Le modèle est requis." }),
    mileage: z.preprocess(
        (val) => Number(val),
        z.number().min(0, { message: "Le kilométrage doit être positif." })
    ),
    registrationNumber: z.string().min(1, { message: "L&apos;immatriculation est requise." }),
    purchaseDate: z.string().min(1, { message: "La date d&apos;achat est requise." }),
    ownerId: z.string().min(1, { message: "Le propriétaire est requis." }),
});

export type BikeFormData = z.infer<typeof bikeFormSchema>;

export interface BikeFormProps {
    onSubmit: (data: BikeFormData) => void;
}

export default function BikeForm({ onSubmit }: BikeFormProps) {
    const [owners, setOwners] = useState<{ id: string; name: string }[]>([]);
    const form = useForm<BikeFormData>({
        resolver: zodResolver(bikeFormSchema),
        defaultValues: {
            vin: "",
            brand: "",
            model: "",
            mileage: 0,
            registrationNumber: "",
            purchaseDate: new Date().toISOString().split("T")[0],
            ownerId: "",
        },
    });

    // Récupération des propriétaires depuis l'API /users
    useEffect(() => {
        async function fetchOwners() {
            try {
                const res = await fetch("http://localhost:3001/users/");
                if (res.ok) {
                    const data = await res.json();
                    setOwners(data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des propriétaires :", error);
            }
        }
        fetchOwners();
    }, []);

    const handleSubmit = (values: BikeFormData) => {
        onSubmit(values);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="vin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>VIN</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez le VIN" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Marque</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez la marque" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Modèle</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez le modèle" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mileage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kilométrage</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={field.value}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="registrationNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Immatriculation</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez l&apos;immatriculation" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="purchaseDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date d&apos;achat</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ownerId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Propriétaire</FormLabel>
                            <FormControl>
                                <select
                                    {...field}
                                    className="border rounded px-2 py-1 w-full"
                                    onChange={(e) => field.onChange(e.target.value)}
                                >
                                    <option value="">Sélectionnez un propriétaire</option>
                                    {owners.map((owner) => (
                                        <option key={owner.id} value={owner.id}>
                                            {owner.name}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Ajouter la moto</Button>
            </form>
        </Form>
    );
}
