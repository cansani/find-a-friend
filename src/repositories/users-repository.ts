import { User, Prisma } from "generated/prisma";

export interface UsersRepository {
    create(data: Prisma.UserUncheckedCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
}