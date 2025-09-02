import { OrgsRepository } from "@/repositories/orgs-repository"
import { compare } from "bcryptjs"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"
import { UsersRepository } from "@/repositories/users-repository"

interface AuthRequest {
    email: string
    password: string
}

export class AuthService {
    constructor(
        private readonly repository: OrgsRepository | UsersRepository
    ) {}

    async handle({ email, password }: AuthRequest) {
        const account = await this.repository.findByEmail(email)

        if (!account) {
            throw new InvalidCredentialsError()
        }
        
        const correctPassword = await compare(password, account.password_hash)

        if (!correctPassword) {
            throw new InvalidCredentialsError()
        }

        return {
            account
        }
    }
}