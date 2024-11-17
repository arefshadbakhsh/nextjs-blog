import React from "react";
import prisma from "@/lib/prisma";
import { Card } from "@/component/material-tailwind";

export const dynamic = "force-dynamic";


export default async function Page() {
  const posts = await prisma.post.findMany({
    include: {
      author: true, // Include the author's information
    },
  }); // Adjust 'post' based on your model name

  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {posts.map((post) => (
        <Card className="flex flex-col gap-y-8 p-4" key={post.id}>
          <div><strong>Title</strong>: {post.title}</div>
          <div><strong>Author</strong>: {post.author.firstName} {post.author.lastName}</div>
          <div><strong>Date</strong>: {post.created.toLocaleDateString()}</div>
        </Card>
      ))}
    </div>
  );
}
