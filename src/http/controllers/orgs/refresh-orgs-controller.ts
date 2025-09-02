import { RefreshTokenError } from "@/services/errors/refresh-token-err";
import { FastifyReply, FastifyRequest } from "fastify";

export async function refreshOrgsController(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify({ onlyCookie: true })
    } catch (err) {
        throw new RefreshTokenError()
    }

    const userId = request.user.sub

    const accessToken = await reply.jwtSign(
        {
            type: "org"
        }, 
        {
            sub: userId
        }
    )

    const refreshToken = await reply.jwtSign(
        {
            type: "org"
        },
        {
            sub: userId,
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
}