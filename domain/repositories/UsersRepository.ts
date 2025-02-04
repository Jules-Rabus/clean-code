import User from "@app/domain/entities/User";

export default interface UsersRepository {
    create(user: User): Promise<User>;
    update(id: string, user: Partial<User>): Promise<User | null>;
    remove(id: string): Promise<void>;
    findOne(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    searchByEmail(email: string): Promise<User[]>;
}