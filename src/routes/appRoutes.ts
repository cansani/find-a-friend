import { authOrgsController } from "@/http/controllers/auth-orgs-controller";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
    app.post("/sessions/orgs", authOrgsController)
}