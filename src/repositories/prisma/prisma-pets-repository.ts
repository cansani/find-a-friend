import { Prisma, Pet } from "generated/prisma";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet = await prisma.pet.create({
            data
        })

        return pet
    }

    async findManyAvailableByCity(city: string): Promise<Pet[]> {
        const pets = await prisma.pet.findMany({
            where: {
                available: true,
                city: {
                    contains: city,
                    mode: "insensitive"
                }
            }
        })

        return pets
    }

    async findUnique(id: string): Promise<Pet | null> {
        const pet = await prisma.pet.findUnique({
            where: {
                id
            }
        })

        return pet
    }

    async findManyByCharacteristics(characteristics: object): Promise<Pet[]> {
        const whereClauses = Object.entries(characteristics).map(([key, value]) => ({
            characteristics: {
                path: [key],
                equals: value
            }
        }))

        const pets = await prisma.pet.findMany({
            where: {
                AND: whereClauses
            }
        })

        return pets
    }
}