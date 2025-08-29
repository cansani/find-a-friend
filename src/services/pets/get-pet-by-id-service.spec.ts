import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { GetPetByIdServiceService } from "./get-pet-by-id-service"

let petsRepository: InMemoryPetsRepository
let sut: GetPetByIdServiceService

describe("Get pet by id", () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        sut = new GetPetByIdServiceService(petsRepository)
    })

    it("should be able to get a pet by id", async () => {
        const petId = "62b77cc1-09fe-4ec2-95a4-4fa205ee404a"

        const pet = await petsRepository.create({
            id: petId,
            name: "Theodoro",
            city: "Sao Paulo",
            characteristics: {
                type: "Dog",
                color: "White"
            },
            available: true,
            org_id: "orgId1"
        })

        await sut.handle({
            id: petId
        })

        expect(pet).toEqual(
            expect.objectContaining({
                id: petId
            })
        )
    })
})