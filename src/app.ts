import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import z, { ZodError } from "zod";
import { appRoutes } from "./http/routes/appRoutes";
import fastifyCookie from "@fastify/cookie";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: "10m"
    },
    cookie: {
        cookieName: "refreshToken",
        signed: false
    }
})

app.register(fastifyCookie)

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: "Erro de validação",
            issues: z.prettifyError(error)
        })
    }

    if (env.NODE_ENV !== "production") {
        console.error(error)
    }

    return reply.status(500).send({
        message: "Internal server error."
    })
})