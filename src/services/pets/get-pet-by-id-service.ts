import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "generated/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPetByIdServiceRequest {
    id: string
}

interface GetPetByIdServiceResponse {
    pet: Pet 
}

export class GetPetByIdServiceService {
    constructor(
        private readonly petsRepository: PetsRepository
    ) {}

    async handle({ id }: GetPetByIdServiceRequest): Promise<GetPetByIdServiceResponse> {
        const pet = await this.petsRepository.findUnique(id)

        if (!pet) {
            throw new ResourceNotFoundError()
        }

        return {
            pet
        }
    }
}