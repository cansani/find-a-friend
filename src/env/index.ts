import "dotenv/config"
import z from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.coerce.string(),
    PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    console.error("Variaveis de ambiente invalidas ou nao informadas.")
    throw new Error("Variaveis de ambiente invalidas ou nao informadas.")
}

export const env = _env.data