"use server";

import prisma from "@/lib/prisma";

export async function getUserPosts(userId: number) {
  return prisma.post.findMany({
    where: { authorId: userId },
    include: {
      author: true, // Include the author's information
    },
  });
}