import { prisma } from "./lib/prisma.js";

async function main() {
  return await prisma.user.create({
    data: {
      name: "John Doe",
      email: "aa@gmail.com",
      posts: {
        create: [
          {
            title: "Post 1",
            content: "Content 1",
            published: true,
          },
          {
            title: "Post 2",
            content: "Content 2",
            published: false,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    console.log("Seeding successful!"); // အောင်မြင်ကြောင်း သိရအောင် log ထည့်ပေးထားတယ်
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });