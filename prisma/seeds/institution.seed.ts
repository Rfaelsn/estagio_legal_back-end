// users.seed.ts
import { Prisma } from '@prisma/client';

export async function seedInstitution(
  prismaTransaction: Prisma.TransactionClient,
) {
  const cnpj = '10.763.998/0003-00 ';
  const existing = await prismaTransaction.institution.findFirst({
    where: { cnpj },
  });
  if (existing) {
    return existing;
  }
  return prismaTransaction.institution.create({
    data: {
      name: 'Instituto Federal de Educação, Ciência e Tecnologia do Pará',
      campus: 'Belém',
      cnpj,
      UF: 'PA',
      city: 'Belém',
      district: 'Marco',
      address: 'Av. Almirante Barroso, 1155',
      telephone: '91 3201-1763/1712',
      postalCode: '66093-032',
      legalRepresentative: 'Jair Alcindo Lobo de Melo',
      legalRepresentativeRole: 'Diretor de Extensão',
    },
  });
}
