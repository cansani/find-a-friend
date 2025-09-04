import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"

describe("Refresh Orgs Controller", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to refresh org", async () => {
        const email = "org@gmail.com"
        const password = "123456"

        await request(app.server).post("/orgs").send({
            email,
            password,
            address: "Rua Qualquer 1",
            phone: "5511999999999"
        })

        const authResponse = await request(app.server).post("/orgs/sessions").send({
            email,
            password
        })

        const authResponseCookies = authResponse.get("Set-Cookie")!

        const refreshResponse = await request(app.server).post("/orgs/refresh").set("Cookie", authResponseCookies).send()

        expect(refreshResponse.statusCode).toEqual(200)
    })
})