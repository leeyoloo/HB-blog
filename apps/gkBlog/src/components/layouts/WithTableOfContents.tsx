import clsx from "clsx";

import Sidebar from "@/components/sidebar/Sidebar";
import TableOfContents from "@/components/TableOfContents";
import WalineComments from "@/components/WalineComments";

import type { TTableOfContents } from "@/types";
import type { PropsWithChildren } from "react";

interface PageWithMDXProps {
  tableOfContents: TTableOfContents;
}

function PageWithMDX({
  tableOfContents,
  children = null,
}: PropsWithChildren<PageWithMDXProps>) {
  return (
    <div
      className={clsx(
        "content-wrapper flex-shrink-0 overflow-hidden mx-auto w-[100%]",
        "lg:overflow-visible",
      )}
    >
      <div className={clsx("flex flex-row gap-6")}>
        {/* 左侧 */}
        <div className={clsx("flex min-w-0 flex-col flex-1")}>
          {/* 上 */}
          <div className={clsx("flex flex-row")}>
            <div
              className={clsx("mdx-contents min-w-0 flex-1 scroll-mt-[86px]")}
              id="main-contents"
              data-ss-wrapper
            >
              {children}
            </div>
          </div>
          {/* 下 */}
          <div className={clsx("mt-4")}>
            <WalineComments />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageWithMDX;
