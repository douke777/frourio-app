import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoryData: Prisma.CategoryCreateInput[] = [
  { slug: 'programming' },
  { slug: 'marketing' },
  { slug: 'business' },
  { slug: 'data' },
  { slug: 'design' },
  { slug: 'music' },
  { slug: 'video' },
  { slug: 'writing' },
];

async function main() {
  const categories = await prisma.category.findMany();
  if (categories.length) return;

  await Promise.all(
    categoryData.map(async (category) => {
      await prisma.category.create({
        data: category,
      });
    }),
  );
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
