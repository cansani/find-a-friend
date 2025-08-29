import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "generated/prisma";

interface GetAvailablePetsRequest {
    city: string
}

interface GetAvailablePetsResponse {
    pets: Pet[]
}

export class GetAvailablePetsService {
    constructor(
        private readonly petsRepository: PetsRepository
    ) {}

    async handle({ city }: GetAvailablePetsRequest): Promise<GetAvailablePetsResponse> {
        const pets = await this.petsRepository.findManyAvailableByCity(city)

        return {
            pets
        }
    }
}