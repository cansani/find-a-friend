import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"

describe("Auth Orgs Controller", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to authenticate", async () => {
        const email = "org-1@gmail.com"
        const password = "123456"

        await prisma.org.create({
            data: {
                email,
                password_hash: await hash(password, 6),
                address: "Rua Qualquer 1",
                phone: "5511999999999"
            }
        })

        const response = await request(app.server).post("/orgs/sessions").send({
            email,
            password
        })

        expect(response.body).toEqual({
            accessToken: expect.any(String)
        })
    })
})