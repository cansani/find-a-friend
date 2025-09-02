import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"

describe("Auth Users Controller", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to authenticate user", async () => {
        const email = "user1@gmail.com"
        const password = "123456"

        await prisma.user.create({
            data: {
                email,
                password_hash: await hash(password, 6),
            }
        })

        const response = await request(app.server).post("/users/sessions").send({
            email,
            password
        })

        expect(response.body).toEqual({
            accessToken: expect.any(String)
        })
    })
})