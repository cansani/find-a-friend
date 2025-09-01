import { OrgsRepository } from "@/repositories/orgs-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { AuthService } from "./auth-service"
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository"
import { hash } from "bcryptjs"

let orgsRepository: OrgsRepository
let sut: AuthService

describe("Authenticate", () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new AuthService(orgsRepository)
    })

    it("should be able to authenticate", async () => {
        await orgsRepository.create({
            email: "org@gmail.com",
            password_hash: await hash("123456", 6),
            address: "Rua Org 1234",
            phone: "5521999999999"
        })

        await expect(
            sut.handle({
                email: "org@gmail.com",
                password: "123456"
            })
        ).resolves.not.toThrow()
    })
})