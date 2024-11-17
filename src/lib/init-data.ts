import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export const prismaInitData = {
  prisma,
  // Seed Users
  async seedUsers() {
    console.log("Seeding Users...");
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(), // You might want to hash passwords for real scenarios
      });
    }
    await prisma.user.createMany({ data: users });
  },

  // Seed Categories
  async seedCategories() {
    console.log("Seeding Categories...");
    const categories = ["Technology", "Health", "Business", "Lifestyle", "Science"];
    for (const name of categories) {
      await prisma.category.create({
        data: { name },
      });
    }
  },

  // Seed Posts
  async seedPosts() {
    console.log("Seeding Posts...");
    const users = await prisma.user.findMany();
    const categories = await prisma.category.findMany();

    for (let i = 0; i < 20; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];

      await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          published: faker.datatype.boolean(),
          authorId: randomUser.id,
          categoryId: randomCategory.id,
        },
      });
    }
  },

  // Complete Seeding Process
  async seedAll() {
    console.log("Seeding all models...");
    await this.seedUsers();
    await this.seedCategories();
    await this.seedPosts();
    console.log("Seeding complete!");
  },
};