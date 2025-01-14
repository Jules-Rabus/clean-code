import { Schema, model } from 'mongoose';
import Bike from '@app/domain/entities/Bike';

const bikeSchema = new Schema<Bike>({
    vin: String,
    brand: String,
    model: String,
    mileage: Number,
    purchaseDate: Date,
    warrantyExpirationDate: Date,
    isActive: Boolean,
    isDecommissioned: Boolean,
}, { timestamps: true });

export const BikeModel = model<Bike>('Bike', bikeSchema);