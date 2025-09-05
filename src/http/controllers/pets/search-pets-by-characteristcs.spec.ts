import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest"
import { prisma } from "@/lib/prisma";

describe("Search Pets", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to search pets by characteristcs", async () => {
        await prisma.org.create({
            data: {
                id: "f4f78fe1-c1f7-49ca-b94e-6e2f6282d123",
                email: "org@gmail.com",
                address: "Rua Qualquer",
                password_hash: "123456",
                phone: "5511111111111"
            }
        })

        await prisma.pet.create({
            data: {
                id: "071f32b3-dc25-42ed-9262-c444606ea629",
                name: "Theodoro",
                city: "Piracicaba",
                characteristics: {
                    color: "Orange"
                },
                available: true,
                org_id: "f4f78fe1-c1f7-49ca-b94e-6e2f6282d123"
            }
        })

        const response = await request(app.server).post("/pets/search").send({
            characteristics: {
                    color: "Orange"
                }
        })

        expect(response.body.pets).toEqual([
            expect.objectContaining({
                "id": "071f32b3-dc25-42ed-9262-c444606ea629",
            })
        ])
    })
})