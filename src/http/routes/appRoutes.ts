import { authOrgsController } from "@/http/controllers/orgs/auth-orgs-controller";
import { authUsersController } from "@/http/controllers/users/auth-users-controller";
import { createUsersController } from "@/http/controllers/users/create-users-controller";
import { FastifyInstance } from "fastify";
import { refreshUsersController } from "../controllers/users/refresh-users-controller";
import { refreshOrgsController } from "../controllers/orgs/refresh-orgs-controller";
import { createOrgsController } from "../controllers/orgs/create-orgs-controller";

export async function appRoutes(app: FastifyInstance) {
    //Auth
    app.post("/orgs/sessions", authOrgsController)
    app.post("/users/sessions", authUsersController)

    //Refresh Token
    app.post("/users/refresh", refreshUsersController)
    app.post("/orgs/refresh", refreshOrgsController)

    //Users
    app.post("/users", createUsersController)

    //Orgs
    app.post("/orgs", createOrgsController)
}