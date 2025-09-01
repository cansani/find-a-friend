import { Pet, Prisma } from "generated/prisma";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";
import { JsonValue } from "generated/prisma/runtime/library";

type Characteristics = Prisma.JsonObject

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []

    async findManyByCharacteristics(characteristics: Characteristics): Promise<Pet[]> {
        const pets = this.items.filter((pet) => {
            const petsFound = Object.entries(characteristics).every(([key, value]) => {
                const petCharacteristics = pet.characteristics as Prisma.JsonObject
                return petCharacteristics?.[key] === value
            })

            return petsFound
        })

        return pets
    }

    async findUnique(id: string): Promise<Pet | null> {
        const pet = this.items.find(pet => pet.id === id)

        if (!pet) {
            return null
        }

        return pet
    }

    async findManyAvailableByCity(city: string): Promise<Pet[]> {
        const pets = this.items.filter((pet) => pet.available === true && pet.city.includes(city))

        return pets
    }


    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet = {
            id: data.id ?? randomUUID(),
            name: data.name,
            city: data.city,
            available: data.available ?? true,
            characteristics: data.characteristics as JsonValue,
            org_id: data.org_id
        }

        this.items.push(pet)

        return pet
    }
}