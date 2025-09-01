import { PetsRepository } from "@/repositories/pets-repository";
import { Pet, Prisma } from "generated/prisma";

type Characteristics = Prisma.JsonObject

interface PetsCreateRequest {
    name: string
    city: string
    available: boolean
    characteristics: Characteristics
    orgId: string
}

interface PetsCreateResponse {
    pet: Pet
}

export class PetsCreateService {
    constructor(
        private readonly petsRepository: PetsRepository
    ) {}

    async handle({ name, city, characteristics, available, orgId }: PetsCreateRequest): Promise<PetsCreateResponse> {
        const pet = await this.petsRepository.create({
            name,
            city,
            characteristics,
            org_id: orgId,
            available
        })

        return {
            pet
        }
    }
}