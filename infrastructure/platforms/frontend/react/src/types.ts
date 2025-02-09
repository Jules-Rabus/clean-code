export interface Bike {
    vin: string | { value: string };
    brand: string;
    model: string;
    mileage: number;
    registrationNumber: string;
    purchaseDate: string;
    warrantyExpirationDate: string | null;
    ownerId: string;
    isActive: boolean;
    isInMaintenance: boolean;
    isDecommissioned: boolean;
    nextMaintenanceMileage: number | null;
    nextMaintenanceDate: string | null;
    createdAt: string;
    updatedAt: string | null;
}

export interface BikeFormData {
    vin: string;
    brand: string;
    model: string;
    mileage: number;
    registrationNumber: string;
    purchaseDate: string;
}

export interface BikeFormProps {
    onSubmit: (data: BikeFormData) => void;
}
