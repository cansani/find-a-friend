import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { OrgCreateService } from "@/services/orgs/create-org-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createOrgsController(request: FastifyRequest, reply: FastifyReply) {
    const authRequestSchema = z.object({
        email: z.string(),
        password: z.string(),
        address: z.string(),
        phone: z.string()
    })

    const { email, password, address, phone } = authRequestSchema.parse(request.body)

    try {   
        const orgsRepository = new PrismaOrgsRepository()
        const createOrgsService = new OrgCreateService(orgsRepository)

        await createOrgsService.handle({
            email,
            password,
            address,
            phone
        })

        return reply.status(201).send()
    } catch (err) {
        throw err
    }
}