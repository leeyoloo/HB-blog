import { getAllCategories, getAllTags, getSortedPosts } from "@/lib/posts";

import BlogContents from "@/contents/blog";
import Page from "@/contents-layouts/Page";

import type { BlogContentsProps } from "@/contents/blog";
import type { GetStaticProps } from "next";

type BlogProps = {
  posts: BlogContentsProps["posts"];
  categories: string[];
  tags: Record<string, number>;
};

function Blog({ posts, categories, tags }: BlogProps) {
  return (
    <Page
      frontMatter={{
        title: "个人博客",
        description: "学习、笔记、生活",
      }}
    >
      <BlogContents posts={posts} categories={categories} tags={tags} />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const allPostsData = getSortedPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return {
    props: {
      posts: allPostsData,
      categories,
      tags,
    },
  };
};

export default Blog;
