import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetByIdServiceService } from "@/services/pets/get-pet-by-id-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getPetByIdController(request: FastifyRequest, reply: FastifyReply) {
    const getPetRequestSchema = z.object({
        id: z.uuid(),
    })

    const { id  } = getPetRequestSchema.parse(request.params)

    try {
        const petsRepository = new PrismaPetsRepository()
        const getPetByIdService = new GetPetByIdServiceService(petsRepository)

        const { pet } = await getPetByIdService.handle({
            id
        })

        return reply.status(200).send({
            pet
        })
    } catch (err) {
        throw err
    }
}