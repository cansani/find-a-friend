import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthService } from "@/services/auth/auth-service";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authUsersController(request: FastifyRequest, reply: FastifyReply) {
    const authRequestSchema = z.object({
        email: z.string(),
        password: z.string()
    })

    const { email, password } = authRequestSchema.parse(request.body)

    try {   
        const usersRepository = new PrismaUsersRepository()
        const authService = new AuthService(usersRepository)

        const { account } = await authService.handle({
            email,
            password
        })

        const accessToken = await reply.jwtSign(
            {
                type: "user"
            }, 
            {
                sub: account.id
            }
        )

        const refreshToken = await reply.jwtSign(
            {
                type: "user"
            },
            {
                sub: account.id,
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