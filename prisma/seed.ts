import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const items = [
  {
    name: 'google',
    url: 'http://google.com',
    group: 'Search engine',
  },
  {
    name: 'yahoo',
    url: 'http://yahoo.com',
    group: 'Search engine',
  },
];

async function main() {
  for (let item of items) {
    await prisma.bookmark.create({ data: item });
  }
}

main()
  .catch(err => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
