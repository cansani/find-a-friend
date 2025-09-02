import { Prisma, User } from "generated/prisma";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = []

    async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
        const user = {
            id: data.id ?? randomUUID(),
            email: data.email,
            password_hash: data.password_hash
        }

        this.items.push(user)

        return user

    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email)

        if (!user) {
            return null
        }

        return user
    }
}