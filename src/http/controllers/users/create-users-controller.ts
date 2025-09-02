import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateUsersService } from "@/services/users/create-users-service";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createUsersController(request: FastifyRequest, reply: FastifyReply) {
    const authRequestSchema = z.object({
        email: z.string(),
        password: z.string()
    })

    const { email, password } = authRequestSchema.parse(request.body)

    try {   
        const usersRepository = new PrismaUsersRepository()
        const createUsersService = new CreateUsersService(usersRepository)

        await createUsersService.handle({
            email,
            password
        })

        return reply.status(201).send()
    } catch (err) {
        throw err
    }
}