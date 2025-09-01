import { PetsRepository } from "@/repositories/pets-repository";
import { Pet, Prisma } from "generated/prisma";

type Characteristics = Prisma.JsonObject

interface GetPetsByCharacteristicsRequest {
    characteristics: Characteristics
}

interface GetPetsByCharacteristicsResponse {
    pets: Pet[]
}

export class GetPetsByCharacteristicsService {
    constructor(
        private readonly petsRepository: PetsRepository
    ) {}

    async handle({ characteristics }: GetPetsByCharacteristicsRequest): Promise<GetPetsByCharacteristicsResponse> {
        const pets = await this.petsRepository.findManyByCharacteristics(characteristics)

        return {
            pets
        }
    }
}