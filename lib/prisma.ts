import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const prismaClientSingleton = () => {
  // Menggunakan driver asli PG untuk koneksi yang stabil
  const connectionString = "postgresql://neondb_owner:npg_j6lHLyREk1ZW@ep-holy-wave-azlucile-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
  
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  
  // Konstruktor Prisma 7+ mewajibkan adapter ini
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma