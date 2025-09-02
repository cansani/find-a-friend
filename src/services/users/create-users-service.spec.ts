import { UsersRepository } from "@/repositories/users-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { CreateUsersService } from "./create-users-service"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"

let usersRepository: UsersRepository
let sut: CreateUsersService

describe("Create User", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new CreateUsersService(usersRepository)
    })

    it("should be able to create a user", async () => {
        const { user } = await sut.handle({
            email: "user@gmail.com",
            password: "123456",
        })

        expect(user.id).toEqual(expect.any(String))
    })
})