import Part from '@app/domain/entities/Part';

export default interface PartsRepository {
    create(part: Part): Promise<Part>;
    update(identifier: string, part: Partial<Part>): Promise<Part | null>;
    remove(identifier: string): Promise<void>;
    findOne(identifier: string): Promise<Part | null>;
    findAll(): Promise<Part[]>;
}