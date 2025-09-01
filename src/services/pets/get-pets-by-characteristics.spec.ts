import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { GetPetsByCharacteristicsService } from "./get-pets-by-characteristics-service"

let petsRepository: InMemoryPetsRepository
let sut: GetPetsByCharacteristicsService

describe("List pets by characteristics", () => {
    beforeEach(() => {
        petsRepository = new InMemoryPetsRepository()
        sut = new GetPetsByCharacteristicsService(petsRepository)
    })

    it("should be able to list pets by characteristics", async () => {
        const characteristics = {
            type: "Dog",
            color: "White"
        }
        
        await petsRepository.create({
            name: "Theodoro",
            city: "Sao Paulo",
            characteristics,
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
            characteristics: {
                type: "Dog"
            }
        })

        expect(pets).toHaveLength(2)
        expect(pets).toEqual([
            expect.objectContaining({
                name: "Theodoro"
            }),
            expect.objectContaining({
                name: "Luna"
            })
        ])
    })
})