import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { GetAvailablePetsService } from "./get-available-pets-service"

let petsRepository: InMemoryPetsRepository
let sut: GetAvailablePetsService

describe("List available pets by city", () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        sut = new GetAvailablePetsService(petsRepository)
    })

    it("should be able to list pets by city", async () => {
        await petsRepository.create({
            name: "Theodoro",
            city: "Sao Paulo",
            characteristics: {
                type: "Dog",
                color: "White"
            },
            available: true,
            org_id: "orgId1"
        })

        await petsRepository.create({
            name: "Luna",
            city: "Campinas",
            characteristics: {
                type: "Dog",
                color: "Brown"
            },
            available: true,
            org_id: "orgId1"
        })

        const { pets } = await sut.handle({
            city: "Sao Paulo"
        })

        expect(pets).toHaveLength(1)
        expect(pets).toEqual([
            expect.objectContaining({
                name: "Theodoro"
            })
        ])
    })
})