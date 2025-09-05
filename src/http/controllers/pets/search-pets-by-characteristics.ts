import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetsByCharacteristicsService } from "@/services/pets/get-pets-by-characteristics-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function searchPetsByCharacteristicsController(request: FastifyRequest, reply: FastifyReply) {
    const searchPetsRequestSchema = z.object({
        characteristics: z.record(z.string(), z.string())
    })

    const { characteristics } = searchPetsRequestSchema.parse(request.body)

    try {
        const petsRepository = new PrismaPetsRepository()
        const searchPetsService = new GetPetsByCharacteristicsService(petsRepository)

        const { pets } = await searchPetsService.handle({
            characteristics
        })

        return reply.status(200).send({
            pets
        })
    } catch (err) {
        throw err
    }
}