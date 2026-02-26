import clsx from "clsx";
import Link from "next/link";

import type { PropsWithChildren } from "react";
import { TPostFrontMatter } from "@/types";

type ChipProps = {
  href: string;
};

function Chip({ href, children = null }: PropsWithChildren<ChipProps>) {
  return (
    <Link
      href={href}
      className={clsx(
        "bg-accent-600/[0.08] text-accent-600 inline-flex h-6 items-center gap-1 rounded-full px-2 text-[13px] font-medium",
        "dark:text-accent-400 dark:dark:bg-accent-400/10 dark:font-normal",
      )}
    >
      {children}
    </Link>
  );
}

interface PostFooterProps {
  tags: TPostFrontMatter["tags"];
  category: TPostFrontMatter["category"];
}

function PostFooter({ tags, category }: PostFooterProps) {
  return null;
}

export default PostFooter;
