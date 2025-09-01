import { OrgsRepository } from "@/repositories/orgs-repository"
import { compare } from "bcryptjs"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"

interface AuthRequest {
    email: string
    password: string
}

export class AuthService {
    constructor(
        private readonly orgsRepository: OrgsRepository
    ) {}

    async handle({ email, password }: AuthRequest) {
        const org = await this.orgsRepository.findByEmail(email)

        if (!org) {
            throw new InvalidCredentialsError()
        }
        
        const correctPassword = await compare(password, org.password_hash)

        if (!correctPassword) {
            throw new InvalidCredentialsError()
        }

        return {
            org
        }
    }
}