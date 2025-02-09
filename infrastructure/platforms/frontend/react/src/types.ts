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
  maintenances: Maintenance[];
  incidents: Incident[];
  createdAt: string;
  updatedAt: string;
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

export interface Maintenance {
  identifier: string;
  date: string;
  mileage: number;
  description: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Incident {
  identifier: string;
  date: string;
  description: string;
  isResolved: boolean;
  createdAt: string;
  updatedAt: string;
}
