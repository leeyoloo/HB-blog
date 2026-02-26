import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import type { ReactNode } from "react";

export type NavLinkProps = {
  title: string;
  href: string;
  icon?: ReactNode;
  onClick?: () => void;
};

function NavLink({
  title,
  href,
  icon = null,
  onClick = () => {},
}: NavLinkProps) {
  const router = useRouter();
  // 修复 Hydration Mismatch: 移除 hash 部分后再进行比较
  // 这样无论 URL 是否包含 #锚点，都能保持服务端和客户端的一致性
  const asPathWithoutHash = router.asPath.split("#")[0];
  const hrefWithoutHash = href.split("#")[0];

  // 检查是否为当前路径，移除末尾斜杠进行比较以提高兼容性
  const isCurrent =
    asPathWithoutHash.replace(/\/$/, "") === hrefWithoutHash.replace(/\/$/, "");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    onClick();
    if (isCurrent) {
      e.preventDefault();
    }
  };

  return (
    <Link
      href={href}
      className={clsx(
        "nav-link",
        "hover:bg-slate-300/50 dark:hover:bg-slate-600/50", // 添加悬浮背景效果
        isCurrent && "active" // 可选：标记激活状态
      )}
      onClick={handleClick}
    >
      {title}
      {icon}
    </Link>
  );
}

export default NavLink;
