import User from "@app/domain/entities/User";

export default interface UsersRepository {
    create(user: User): Promise<User>;
    update(identifier: string, user: Partial<User>): Promise<User | null>;
    remove(identifier: string): Promise<void>;
    findOne(identifier: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    searchByEmail(email: string): Promise<User[]>;
}