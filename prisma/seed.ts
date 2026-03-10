import { PrismaClient } from '../@generated/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
    adapter,
})

async function main() {
    console.log('⏳ Пробую подключиться к базе для сидирования...')

    const adminPassword = await bcrypt.hash('admin123', 10)
    const staffPassword = await bcrypt.hash('staff123', 10)

    await prisma.user.upsert({
        where: { email: 'admin@lyceum.kg' },
        update: {},
        create: {
            email: 'admin@lyceum.kg',
            name: 'Администратор Лицея',
            password: adminPassword,
            role: 'ADMIN',
        },
    })

    await prisma.user.upsert({
        where: { email: 'staff@lyceum.kg' },
        update: {},
        create: {
            email: 'staff@lyceum.kg',
            name: 'Преподаватель Лицея',
            password: staffPassword,
            role: 'STAFF',
        },
    })

    console.log('✅ Данные успешно загружены!')
}

main()
    .catch((e) => {
        console.error('❌ Критическая ошибка:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
