import { Pet, Prisma } from "generated/prisma";

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findManyAvailableByCity(city: string): Promise<Pet[]>
    findUnique(id: string): Promise<Pet | null>
}