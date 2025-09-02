import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"

describe("Refresh Users Controller", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to refresh user", async () => {
        const email = "user@gmail.com"
        const password = "123456"

        await request(app.server).post("/users").send({
            email,
            password
        })

        const authResponse = await request(app.server).post("/users/sessions").send({
            email,
            password
        })

        const authResponseCookies = authResponse.get("Set-Cookie")!

        const refreshResponse = await request(app.server).post("/users/refresh").set("Cookie", authResponseCookies).send()

        expect(refreshResponse.statusCode).toEqual(200)
    })
})