import { authOrgsController } from "@/http/controllers/orgs/auth-orgs-controller";
import { authUsersController } from "@/http/controllers/users/auth-users-controller";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
    app.post("/orgs/sessions", authOrgsController)
    app.post("/users/sessions", authUsersController)
}