import { GetStaticProps } from "next";

import { getSortedPosts } from "@/lib/posts";
import StatsContents from "@/contents/stats";
import Page from "@/contents-layouts/Page";

import type { Stats } from "@/contents/stats";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPosts();

  const posts = allPostsData.map(({ slug, frontMatter: fm }) => ({
    date: fm.date,
    title: fm.title,
    wordCount: fm.wordCount || 0,
    category: fm.category,
    tags: fm.tags || [],
  }));

  const postsByYear = Object.entries(
    posts.reduce(
      (acc, post) => {
        const year = new Date(post.date).getFullYear().toString();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  ).map(([year, count]) => ({ year, count }));

  const postsByCategory = Object.entries(
    posts.reduce(
      (acc, post) => {
        const { category } = post;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  ).map(([category, count]) => ({ category, count }));

  const stats = {
    totalPosts: posts.length,
    totalCategories: new Set(posts.map((p) => p.category)).size,
    totalTags: new Set(posts.flatMap((p) => p.tags)).size,
    totalWordCount: posts.reduce((sum, p) => sum + p.wordCount, 0),
    posts: posts.map((p) => ({
      date: p.date,
      title: p.title,
      wordCount: p.wordCount,
    })),
    postsByYear,
    postsByCategory,
    categories: Array.from(new Set(posts.map((p) => p.category))),
    tags: posts.flatMap((p) => p.tags),
  };

  return {
    props: {
      stats,
    },
  };
};

function StatsPage({ stats }: { stats: Stats }) {
  return (
    <Page
      frontMatter={{
        title: "网站统计数据",
        description: `一些网站文章数据的统计`,
      }}
    >
      <StatsContents initialStats={stats} />
    </Page>
  );
}

export default StatsPage;
