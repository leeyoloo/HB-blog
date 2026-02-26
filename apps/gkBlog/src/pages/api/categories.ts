import type { NextApiRequest, NextApiResponse } from "next";

import { getSortedPosts } from "@/lib/posts";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getSortedPosts();
  const categories = new Set<string>();

  posts.forEach((post) => {
    if (post.frontMatter.category) {
      categories.add(post.frontMatter.category);
    }
  });

  res.status(200).json(Array.from(categories));
}
