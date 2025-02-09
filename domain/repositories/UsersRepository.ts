import User from "@app/domain/entities/User";
import UserNotFoundError from "../errors/users/UserNotFoundError";

export default interface UsersRepository {
  create(user: User): Promise<User>;
  update(
    identifier: string,
    user: Partial<User>,
  ): Promise<User | UserNotFoundError>;
  remove(identifier: string): Promise<number | UserNotFoundError>;
  findOne(identifier: string): Promise<User | UserNotFoundError>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | UserNotFoundError>;
  searchByEmail(email: string): Promise<User[]>;
}
