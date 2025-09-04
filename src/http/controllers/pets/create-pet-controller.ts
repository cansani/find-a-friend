import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PetsCreateService } from "@/services/pets/create-pet-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createPetController(request: FastifyRequest, reply: FastifyReply) {
    const createPetRequestSchema = z.object({
        name: z.string(),
        city: z.string(),
        available: z.boolean().optional(),
        characteristics: z.record(z.string(), z.string()),
        orgId: z.string()
    })

    const { name, city, available, characteristics, orgId  } = createPetRequestSchema.parse(request.body) 

    try {
        const petsRepository = new PrismaPetsRepository()
        const petsCreateService = new PetsCreateService(petsRepository)

        await petsCreateService.handle({
            name,
            available: available ?? true,
            characteristics,
            city,
            orgId,
        })

        return reply.status(201).send()
    } catch (err) {
        throw err
    }
}