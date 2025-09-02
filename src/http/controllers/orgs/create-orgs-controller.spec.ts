import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"

describe("Create Orgs Controller", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to create org", async () => {
        const email = "org@gmail.com"
        const password = "123456"

        const response = await request(app.server).post("/orgs").send({
            email,
            password,
            phone: "123456",
            address: "Rua Qualquer 1"
        })

        expect(response.statusCode).toEqual(201)
    })
})