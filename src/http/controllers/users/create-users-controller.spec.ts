import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"

describe("Create Users Controller", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to create user", async () => {
        const email = "user1@gmail.com"
        const password = "123456"

        const response = await request(app.server).post("/users").send({
            email,
            password
        })

        expect(response.statusCode).toEqual(201)
    })
})