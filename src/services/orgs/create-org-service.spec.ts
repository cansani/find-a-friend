import { OrgsRepository } from "@/repositories/orgs-repository"
import { OrgCreateService } from "./create-org-service"
import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"

let orgsRepository: OrgsRepository
let sut: OrgCreateService

describe("Create org", () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new OrgCreateService(orgsRepository)
    })

    it("should be able to create a organization", async () => {
        const { org } = await sut.handle({
            email: "org@gmail.com",
            password: "123456",
            address: "Av dos Campos 1590",
            phone: "5521999999999"
        })

        expect(org.id).toEqual(expect.any(String))
    })
})