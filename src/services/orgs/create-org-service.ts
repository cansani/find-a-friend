import { OrgsRepository } from "@/repositories/orgs-repository"
import { hash } from "bcryptjs"
import { Org } from "generated/prisma"

interface OrgCreateRequest {
    email: string
    password: string
    address: string
    phone: string
}

interface OrgCreateResponse {
    org: Org
}

export class OrgCreateService {
    constructor(
        private readonly orgsRepository: OrgsRepository
    ) {}

    async handle({ email, password, address, phone }: OrgCreateRequest): Promise<OrgCreateResponse> {
        const hashedPassword = await hash(password, 6)

        const org = await this.orgsRepository.create({
            email,
            password_hash: hashedPassword,
            address,
            phone
        })

        return {
            org
        }
    }
}