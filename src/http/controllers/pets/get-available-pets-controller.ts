import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetAvailablePetsService } from "@/services/pets/get-available-pets-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getAvailablePetsController(request: FastifyRequest, reply: FastifyReply) {
    const getAvailablePetsRequestSchema = z.object({
        city: z.string().min(1),
    })

    const { city } = getAvailablePetsRequestSchema.parse(request.query)

    try {
        const petsRepository = new PrismaPetsRepository()
        const getAvailablePets = new GetAvailablePetsService(petsRepository)

        const { pets } = await getAvailablePets.handle({
            city
        })

        return reply.status(200).send({
            pets
        })
    } catch (err) {
        throw err
    }
}