import { authOrgsController } from "@/http/controllers/orgs/auth-orgs-controller";
import { authUsersController } from "@/http/controllers/users/auth-users-controller";
import { createUsersController } from "@/http/controllers/users/create-users-controller";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
    //Auth
    app.post("/orgs/sessions", authOrgsController)
    app.post("/users/sessions", authUsersController)

    //Refresh Token

    //Users
    app.post("/users", createUsersController)
}