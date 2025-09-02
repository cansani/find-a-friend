import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { User } from "generated/prisma"

interface CreateUsersRequest {
    email: string
    password: string
}

interface CreateUsersResponse {
    user: User
}

export class CreateUsersService {
    constructor(
        private readonly usersRepository: UsersRepository
    ) {}

    async handle({ email, password }: CreateUsersRequest): Promise<CreateUsersResponse> {
        const hashedPassword = await hash(password, 6)

        const user = await this.usersRepository.create({
            email,
            password_hash: hashedPassword,
        })

        return {
            user
        }
    }
}