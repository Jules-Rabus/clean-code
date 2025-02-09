"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bike } from "@/types";

interface BikeCardProps {
    bike: Bike;
}

export default function BikeCard({ bike }: BikeCardProps) {
    const vinDisplay =
        typeof bike.vin === "object" && bike.vin !== null
            ? bike.vin.value
            : bike.vin;

    const purchaseDate = new Date(bike.purchaseDate).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gray-50 p-4">
                <CardTitle className="text-2xl font-bold text-gray-800">
                    {bike.brand} {bike.model}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
                <p className="text-sm text-gray-600">
                    <strong>VIN:</strong> {vinDisplay}
                </p>
                <p className="text-sm text-gray-600">
                    <strong>Kilométrage:</strong> {bike.mileage} km
                </p>
                <p className="text-sm text-gray-600">
                    <strong>Immatriculation:</strong> {bike.registrationNumber}
                </p>
                <p className="text-sm text-gray-600">
                    <strong>Date d&apos;achat:</strong> {purchaseDate}
                </p>
            </CardContent>
        </Card>
    );
}
