import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { ChevronRightIcon, PinIcon } from "@/components/Icons";

import { formatDateRelative, formatLang } from "@/helpers/post";

import type { TPostFrontMatter } from "@/types";

type PostPreviewProps = TPostFrontMatter & {
  slug: string;
  pinned?: boolean;
  cover: string;
  priority?: boolean;
};

function PostPreview({
  title,
  description,
  date,
  slug,
  lang,
  pinned = false,
  cover,
  priority = false,
}: PostPreviewProps) {
  return (
    <article lang={lang}>
      <Link
        key={slug}
        href={`/blog/${slug}`}
        className={clsx(
          "group relative block overflow-hidden bg-gradient-to-t sm:rounded-2xl",
          "mb-6 sm:mb-0", // 小屏幕增加底部间距
          "border border-stone-200/60 dark:border-stone-700/40", // 半透明边框
          "bg-white/60 dark:bg-slate-900/40", // 半透明背景
          "transition-all duration-300 hover:shadow-lg hover:-translate-y-1", // 悬停效果
          pinned
            ? [
                "border-divider-light",
                "sm:border sm:p-4 md:p-6",
                "dark:border-divider-dark",
              ]
            : ["p-3 sm:p-4 md:p-6", "rounded-xl"] // 小屏幕增加内边距和圆角
        )}
      >
        {/* 封面图：始终显示，位置在右侧，小屏更宽 */}
        <div className="absolute inset-y-0 right-0 w-1/3 overflow-hidden block">
          <div className="relative h-full w-full">
            <div className="absolute inset-y-0 left-0 z-10 w-full bg-gradient-to-r from-[#fdfbf7] to-transparent dark:from-[#0c1117] dark:to-transparent" />
            <Image
              src={cover}
              alt={title}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              fill
              priority={pinned || priority}
            />
          </div>
        </div>

        <div className="relative flex flex-col flex-grow min-w-0 z-20">
          {pinned && (
            <div
              className={clsx(
                "relative mb-2 inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium",
                "bg-amber-100 text-amber-700",
                "dark:bg-amber-900/30 dark:text-amber-400",
                "sm:mb-4"
              )}
            >
              <PinIcon className={clsx("h-3.5 w-3.5")} />
              <span>置顶文章</span>
            </div>
          )}
          <div
            className={clsx(
              "text-slate mb-2 flex flex-col gap-2 text-xs text-slate-500",
              "dark:text-slate-400 md:mb-1"
            )}
          >
            <div className={clsx("flex gap-1")}>
              <time dateTime={date} className={clsx("first-letter:uppercase")}>
                {formatDateRelative(date)}
              </time>
              <span>&middot;</span>
              <span>{formatLang(lang)}</span>
            </div>
          </div>

          {/* 标题：小屏幕始终显示，大屏幕始终显示 */}
          <div className={clsx("mb-2 block")}>
            <h2
              className={clsx(
                "block leading-relaxed",
                "text-base font-extrabold text-slate-700", // 小屏幕字号调整
                "sm:text-xl md:text-2xl",
                "dark:text-slate-300",
                "w-2/3 pr-4",
                "line-clamp-2 sm:line-clamp-1" // 小屏幕允许显示两行标题
              )}
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                fontFamily: '"Noto Serif SC", "Songti SC", "SimSun", serif', // 强制标题使用思源宋体
              }}
            >
              {title}
            </h2>
          </div>

          {/* 简介：始终显示 */}
          <div className="mb-3 h-[1.5em] overflow-hidden block">
            <p
              className={clsx(
                "block leading-relaxed text-slate-600",
                "dark:text-slate-400",
                "sm:group-hover:text-slate-700 dark:sm:group-hover:text-slate-300",
                "w-2/3 pr-4",
                "line-clamp-1"
              )}
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </p>
          </div>

          {!pinned && (
            <div
              className={clsx(
                "text-accent-600 items-center gap-1 text-sm font-semibold",
                "dark:text-accent-400",
                "w-2/3",
                "flex" // 始终显示
              )}
            >
              阅读更多
              <ChevronRightIcon className="group-hover:animate-bounce-x mt-1 h-3 w-3 transition" />
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

export default PostPreview;
