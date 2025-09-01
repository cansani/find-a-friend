import { Prisma, Org } from "generated/prisma";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
    public items: Org[] = []

    async findByEmail(email: string): Promise<Org | null> {
        const org = this.items.find(org => org.email === email)

        if (!org) {
            return null
        }

        return org
    }

    async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
        const org = {
            id: data.id ?? randomUUID(),
            email: data.email,
            password_hash: data.password_hash,
            address: data.address,
            phone: data.phone
        }

        this.items.push(org)

        return org
    }
}