import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthService } from "@/services/auth/auth-service";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authOrgsController(request: FastifyRequest, reply: FastifyReply) {
    const authRequestSchema = z.object({
        email: z.string(),
        password: z.string()
    })

    const { email, password } = authRequestSchema.parse(request.body)

    try {   
        const orgsRepository = new PrismaOrgsRepository()
        const authService = new AuthService(orgsRepository)

        const { org } = await authService.handle({
            email,
            password
        })

        const accessToken = await reply.jwtSign(
            {
                type: "org"
            }, 
            {
                sub: org.id
            }
        )

        const refreshToken = await reply.jwtSign(
            {
                type: "org"
            },
            {
                sub: org.id,
                expiresIn: "7d"
            }
        )

        return reply
            .status(200)
            .setCookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                path: "/"
            })
            .send({
                accessToken
            })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(401).send({
                message: err.message
            })
        }

        throw err
    }
}