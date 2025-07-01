import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/User.seed';
import { seedInstitution } from './seeds/institution.seed';
const prisma = new PrismaClient();
async function main() {
  prisma.$transaction(async (prismaTransaction) => {
    const institution = await seedInstitution(prismaTransaction);
    await seedUsers(prismaTransaction, institution.id);
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
