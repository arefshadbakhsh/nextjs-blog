import React from "react";
import { Card } from "@/component/material-tailwind";
import { getCurrentUser } from "@/app/actions/user";
import { getUserPosts } from "@/app/actions/posts";

export const dynamic = "force-dynamic";

export default async function Page() {

  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const posts = await getUserPosts(user!.id);

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
