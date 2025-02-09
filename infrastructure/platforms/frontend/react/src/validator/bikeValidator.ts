export interface BikeFormData {
    vin: string;
    brand: string;
    model: string;
    mileage: number;
    registrationNumber: string;
    purchaseDate: string;
    ownerId: string;
}

export function validateBike(data: BikeFormData): boolean {
    if (!data.vin || data.vin.length !== 17) return false;
    if (!data.brand || !data.model) return false;
    if (data.mileage < 0) return false;
    if (!data.registrationNumber) return false;
    if (!data.purchaseDate || isNaN(Date.parse(data.purchaseDate))) return false;
    if (!data.ownerId) return false;
    return true;
}
