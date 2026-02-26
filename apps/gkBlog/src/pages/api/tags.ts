import type { NextApiRequest, NextApiResponse } from "next";

import { getSortedPosts } from "@/lib/posts";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getSortedPosts();
  const tags: Record<string, number> = {};

  posts.forEach((post) => {
    post.frontMatter.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] || 0) + 1;
    });
  });

  res.status(200).json(tags);
}
