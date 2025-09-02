import { Prisma, Org } from "generated/prisma";
import { OrgsRepository } from "../orgs-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository {
    async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
        const org = await prisma.org.create({
            data
        })

        return org
    }

    async findByEmail(email: string): Promise<Org | null> {
        const org = await prisma.org.findUnique({
            where: {
                email
            }
        })

        return org
    }

}