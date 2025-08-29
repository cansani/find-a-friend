import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { PetsCreateService } from "./create-pet-service"
import { PetsRepository } from "@/repositories/pets-repository"
import { randomUUID } from "node:crypto"

let petsRepository: PetsRepository
let sut: PetsCreateService

describe("Create pet", () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        sut = new PetsCreateService(petsRepository)
    })

    it("should be able to create a pet", async () => {
        const { pet } = await sut.handle({
            name: "Theodoro",
            city: "Sao Paulo",
            characteristics: {
                type: "Dog",
                color: "White"
            },
            available: true,
            orgId: randomUUID()
        })

        expect(pet.id).toEqual(expect.any(String))
    })
})