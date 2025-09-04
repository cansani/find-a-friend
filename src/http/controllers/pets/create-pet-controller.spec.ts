import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { prisma } from "@/lib/prisma";

describe("Create Pet Controller", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to create pet", async () => {
        await prisma.org.create({
            data: {
                id: "f4f78fe1-c1f7-49ca-b94e-6e2f6282d123",
                email: "org@gmail.com",
                address: "Rua Qualquer",
                password_hash: "123456",
                phone: "5511111111111"
            }
        })

        const pet = {
            name: "Theodoro",
            city: "Piracicaba",
            characteristics: {
                color: "Orange"
            },
            orgId: "f4f78fe1-c1f7-49ca-b94e-6e2f6282d123"
        }

        const response = await request(app.server).post("/pets").send(pet)

        expect(response.statusCode).toEqual(201)
    })
})