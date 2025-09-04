import { authOrgsController } from "@/http/controllers/orgs/auth-orgs-controller";
import { authUsersController } from "@/http/controllers/users/auth-users-controller";
import { createUsersController } from "@/http/controllers/users/create-users-controller";
import { FastifyInstance } from "fastify";
import { refreshUsersController } from "../controllers/users/refresh-users-controller";
import { refreshOrgsController } from "../controllers/orgs/refresh-orgs-controller";
import { createOrgsController } from "../controllers/orgs/create-orgs-controller";
import { createPetController } from "../controllers/pets/create-pet-controller";

export async function appRoutes(app: FastifyInstance) {
    //Users
    app.post("/users/sessions", authUsersController)
    app.post("/users/refresh", refreshUsersController)
    app.post("/users", createUsersController)

    //Orgs
    app.post("/orgs/sessions", authOrgsController)
    app.post("/orgs/refresh", refreshOrgsController)
    app.post("/orgs", createOrgsController)

    //Pets
    app.post("/pets", createPetController)
}