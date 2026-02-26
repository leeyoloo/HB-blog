import frontMatter from "front-matter";
import fs from "fs";
import path from "path";

import type { TPostFrontMatter } from "@/types";

const postsDirectory = path.join(process.cwd(), "src/pages/blog");

export const getPostSlugs = () => {
  const dirNames = fs.readdirSync(postsDirectory);

  return dirNames.filter((name) => {
    const dirPath = path.join(postsDirectory, name);
    return (
      fs.statSync(dirPath).isDirectory() &&
      fs.existsSync(path.join(dirPath, "index.mdx"))
    );
  });
};

export const getPostFrontMatter = (slug: string): TPostFrontMatter => {
  // 文章现在在一个文件夹中，每个文件夹下有一个 `index.mdx`
  const fullPath = path.join(postsDirectory, slug, "index.mdx");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // 使用 front-matter 解析文件头部的元数据
  const { attributes } = frontMatter<TPostFrontMatter>(fileContents);

  return attributes;
};

let cachedSortedPosts: ReturnType<typeof computeSortedPosts> | null = null;

const computeSortedPosts = () => {
  const slugs = getPostSlugs();

  const allPostsData = slugs.map((slug) => {
    const data = getPostFrontMatter(slug);

    return {
      slug,
      frontMatter: data,
    };
  });

  // 按日期排序文章
  return allPostsData.sort(
    ({ frontMatter: { date: a } }, { frontMatter: { date: b } }) => {
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
    },
  );
};

export const getSortedPosts = () => {
  if (process.env.NODE_ENV === "production" && cachedSortedPosts)
    return cachedSortedPosts;
  cachedSortedPosts = computeSortedPosts();
  return cachedSortedPosts;
};

// 根据分类获取文章
export const getPostsByCategory = (category: string) => {
  const posts = getSortedPosts();
  return posts.filter((post) => post.frontMatter.category === category);
};

// 根据标签获取文章
export const getPostsByTag = (tag: string) => {
  const posts = getSortedPosts();
  return posts.filter((post) => post.frontMatter.tags?.includes(tag));
};

export const getAllCategories = () => {
  const posts = getSortedPosts();
  const categories = new Set<string>();

  posts.forEach((post) => {
    if (post.frontMatter.category) {
      categories.add(post.frontMatter.category);
    }
  });

  return Array.from(categories);
};

export const getAllTags = () => {
  const posts = getSortedPosts();
  const tags: Record<string, number> = {};

  posts.forEach((post) => {
    post.frontMatter.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] || 0) + 1;
    });
  });

  return tags;
};
