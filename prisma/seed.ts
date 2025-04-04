import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/User.seed';
const prisma = new PrismaClient();
async function main() {
  prisma.$transaction(async (prismaTransaction) => {
    await seedUsers(prismaTransaction);
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
