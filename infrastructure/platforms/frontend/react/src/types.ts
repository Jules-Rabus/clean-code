export interface Bike {
  vin: string | { value: string };
  brand: string;
  model: string;
  mileage: number;
  registrationNumber: string | { value: string };
  purchaseDate: string;
  warrantyExpirationDate: string | null;
  ownerId: string;
  isActive: boolean;
  isDecommissioned: boolean;
  maintenances: Maintenance[];
  incidents: Incident[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  identifier: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Maintenance {
  identifier: string;
  startDate: string;
  endDate: string;
  description: string;
  isDone: boolean;
  bike: Bike;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  identifier: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  bikes: Bike[];
  users: User[];
  createdAt: string;
  updatedAt: string;
}

export interface Incident {
  identifier: string;
  date: string;
  description: string;
  cost: number;
  isResolved: boolean;
  user: User;
  bike: Bike;
  createdAt: string;
  updatedAt: string;
}

export interface Part {
  identifier: string;
  reference: string;
  name: string;
  description: string;
  stockQuantity: number;
  minStockLevel: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  identifier: string;
  startDate: string;
  endDate: string;
  bike: Bike;
  user: User;
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

export interface Alert {
  title: string;
  description: string;
  part: any;
  identifier: string;
  createdAt: string;
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
