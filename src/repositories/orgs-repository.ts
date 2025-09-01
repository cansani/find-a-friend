import { Org, Prisma } from "generated/prisma";

export interface OrgsRepository {
    create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
    findByEmail(email: string): Promise<Org | null>
}