import clsx from "clsx";
import { m } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import useWaline from "@/hooks/useWaline";

import Card from "./Card";

interface RecentArticle {
  title: string;
  url: string;
  cover?: string;
}

interface SidebarProps {
  show: string[];
  categories?: string[];
  tags?: Record<string, number>;
  latestArticles?: RecentArticle[];
}

function Sidebar({
  show,
  categories = undefined,
  tags = undefined,
  latestArticles = [],
}: SidebarProps) {
  const imageUrl =
    "https://your-image-host.example.com/placeholder.png";
  const [recentArticles, setRecentArticles] = useState<RecentArticle[]>([]);
  const [tagsWithCount, setTagsWithCount] = useState<Record<string, number>>(
    tags || {},
  );
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState<string[]>(
    categories || [],
  );

  const [loadingTags, setLoadingTags] = useState(!tags);
  const [loadingCategories, setLoadingCategories] = useState(!categories);

  const { recentComments, fetchRecentComments, walineLoaded } = useWaline();

  useEffect(() => {
    if (tags) {
      setTagsWithCount(tags);
      const sortedTags = Object.entries(tags)
        .sort(
          ([, countA], [, countB]) => (countB as number) - (countA as number),
        )
        .map(([tag]) => tag);
      setVisibleTags(sortedTags.slice(0, 15));
      setLoadingTags(false);
    }
  }, [tags]);

  useEffect(() => {
    if (categories) {
      setVisibleCategories(categories);
      setLoadingCategories(false);
    }
  }, [categories]);

  useEffect(() => {
    if (walineLoaded) {
      fetchRecentComments(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walineLoaded]);

  useEffect(() => {
    if (latestArticles.length > 0) {
      // 随机从最新文章中选一篇
      const randomIndex = Math.floor(Math.random() * latestArticles.length);
      setRecentArticles([latestArticles[randomIndex]]);
    }
  }, [latestArticles]);

  const fetchTags = async () => {
    if (tags) return;
    setLoadingTags(true);
    try {
      const response = await fetch("/api/tags");
      if (response.ok) {
        const data = await response.json();
        setTagsWithCount(data);
        const sortedTags = Object.entries(data)
          .sort(
            ([, countA], [, countB]) => (countB as number) - (countA as number),
          )
          .map(([tag]) => tag);
        setVisibleTags(sortedTags.slice(0, 15));
      }
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    } finally {
      setLoadingTags(false);
    }
  };

  useEffect(() => {
    if (!tags) {
      fetchTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    if (categories) return;
    setLoadingCategories(true);
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setVisibleCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    if (!categories) {
      fetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowMore = () => {
    setShowMore(true);
    const sortedTags = Object.entries(tagsWithCount).sort(
      ([, countA], [, countB]) => countB - countA,
    );
    setVisibleTags(sortedTags.map(([tag]) => tag));
  };

  return (
    <aside
      aria-label="Sidebar with multiple sections"
      className={clsx("md:space-y-6", "space-y-2")}
    >
      {/* Render sections conditionally based on `show` prop */}
      {show.includes("categories") && (
        <>
          {/* 大屏幕：分类卡片 */}
          <Card title="文章分类" className="hidden md:block">
            <div className="flex flex-wrap gap-4">
              {(() => {
                if (loadingCategories) {
                  return (
                    <div className="flex w-full items-center justify-center p-4">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-accent-600 dark:border-slate-700 dark:border-t-accent-400" />
                    </div>
                  );
                }
                if (visibleCategories.length > 0) {
                  return visibleCategories.map((category) => (
                    <a
                      key={category}
                      href={`/blog/category/${category}`}
                      className={clsx(
                        "rounded-md px-3 py-1 text-sm transition-all duration-300",
                        "border border-slate-200 bg-slate-50 text-slate-600",
                        "hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 hover:shadow-sm",
                        "dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400",
                        "dark:hover:border-emerald-700 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300",
                        "font-serif",
                      )}
                      onMouseEnter={() => {}}
                    >
                      {category}
                    </a>
                  ));
                }
                return (
                  <div className="p-2 text-sm text-slate-500">暂无分类</div>
                );
              })()}
            </div>
          </Card>
          {/* 小屏幕：横向滚动分类条 */}
          <div className="md:hidden scrollbar-hide w-full overflow-x-auto px-1">
            <div className="flex gap-3">
              {visibleCategories.map((category) => (
                <a
                  key={category}
                  href={`/blog/category/${category}`}
                  className={clsx(
                    "whitespace-nowrap rounded-md border px-4 py-1 text-lg font-medium transition font-serif",
                    "border-slate-200 bg-slate-50 text-slate-600",
                    "hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800",
                    "dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400",
                    "dark:hover:border-emerald-700 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300",
                  )}
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {show.includes("tags") && (
        <Card title="文章标签" className="">
          <div className="relative overflow-hidden p-2">
            <div className="flex flex-wrap gap-3">
              {(() => {
                if (loadingTags) {
                  return (
                    <div className="flex w-full items-center justify-center p-4">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-accent-600 dark:border-slate-700 dark:border-t-accent-400" />
                    </div>
                  );
                }
                if (visibleTags.length > 0) {
                  return visibleTags.map((tag) => (
                    <a
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="relative rounded-md px-2 py-1 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-emerald-300 dark:hover:bg-slate-800 transition-colors font-serif"
                    >
                      {tag}
                      <sup className="ml-0.5 text-[10px] text-slate-500 font-sans relative top-[-10px]">
                        {tagsWithCount[tag]}
                      </sup>
                    </a>
                  ));
                }
                return (
                  <div className="p-2 text-sm text-slate-500">暂无标签</div>
                );
              })()}
            </div>

            {!showMore &&
              !loadingTags &&
              visibleTags.length < Object.keys(tagsWithCount).length && (
                <div className="relative -mt-8 flex justify-center">
                  <div className="pointer-events-none absolute bottom-5 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-white dark:to-[#161e31]" />
                  <button
                    type="button"
                    onClick={handleShowMore}
                    className={clsx(
                      "z-10 w-full max-w-[90%] rounded-lg bg-slate-200 p-1.5 text-slate-800",
                      "hover:bg-slate-300 sm:ml-0",
                      "dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
                    )}
                  >
                    查看全部
                  </button>
                </div>
              )}
          </div>
        </Card>
      )}

      {show.includes("recentArticles") && (
        <Card title="推荐文章" className="hidden md:block">
          <div className="space-y-3">
            {recentArticles.map((article) => (
              <a
                key={article.url}
                href={article.url}
                className="group block overflow-hidden rounded-lg"
                title={article.title}
              >
                {article.cover && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                    <Image
                      src={article.cover}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <p
                  className={clsx(
                    "mt-2 text-sm font-medium line-clamp-2",
                    "text-slate-700 group-hover:text-emerald-700",
                    "dark:text-slate-300 dark:group-hover:text-emerald-400",
                  )}
                >
                  {article.title}
                </p>
              </a>
            ))}
          </div>
        </Card>
      )}

      {show.includes("recentComments") && (
        <Card title="最近评论" className="hidden md:block">
          <ul className="space-y-2">
            {Array.isArray(recentComments) &&
              recentComments.map((comment: any, index: number) => (
                <li key={comment.objectId}>
                  <a href={comment.url} className="group flex items-center">
                    <Image
                      src={comment.avatar || "/default-avatar.png"}
                      alt={comment.nick}
                      width={32}
                      height={32}
                      className="mr-3 h-8 w-8 rounded-full"
                    />
                    <div className="flex w-full justify-between">
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          {comment.nick}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {(comment.comment || comment.orig || "").replace(
                            /<[^>]*>/g,
                            "",
                          ).length > 50
                            ? `${(comment.comment || comment.orig || "").replace(/<[^>]*>/g, "").slice(0, 50)}...`
                            : (comment.comment || comment.orig || "").replace(
                                /<[^>]*>/g,
                                "",
                              )}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(comment.insertedAt).toLocaleDateString(
                          "zh-CN",
                          {
                            month: "2-digit",
                            day: "2-digit",
                          },
                        )}
                      </p>
                    </div>
                  </a>

                  {index !== recentComments.length - 1 && (
                    <hr className="my-2 border-t border-dashed border-gray-200 dark:border-gray-600" />
                  )}
                </li>
              ))}
          </ul>
        </Card>
      )}

      {show.includes("publicAccount") && (
        <Card title="订阅更新" className="hidden md:block">
          <div className="relative w-full">
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group relative w-full overflow-hidden rounded-xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="公众号二维码"
                className="w-full h-auto rounded-xl transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </m.div>
          </div>
        </Card>
      )}
    </aside>
  );
}

export default Sidebar;
