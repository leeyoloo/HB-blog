import clsx from "clsx";
import fs from "fs";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import path from "path";
import { useState } from "react";

import { bookTitles } from "@/constants/books";
import Page from "@/contents-layouts/Page";

interface Item {
  title: string;
  cover_image_url: string;
  rating: number;
  uuid: string;
  category: string;
  download_url: string;
  tablet_download_url?: string;
  kindle_download_url?: string;
  password?: string;
}

interface MediaData {
  shelf_type: string;
  visibility: number;
  item: Item;
}

interface MediaDetailProps {
  book: MediaData;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { id: string } }[] = [];

  bookTitles.forEach((_, index) => {
    paths.push({ params: { id: `book-${index + 1}` } });
  });

  let filePath = path.join(process.cwd(), "public/assets/data/neodb/book.json");
  if (!fs.existsSync(filePath)) {
    filePath = path.join(
      process.cwd(),
      "apps/gkBlog/public/assets/data/neodb/book.json",
    );
  }

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(fileContent);
      if (jsonData.data && Array.isArray(jsonData.data)) {
        jsonData.data.forEach((entry: MediaData) => {
          if (entry.item && entry.item.uuid) {
            paths.push({ params: { id: entry.item.uuid } });
          }
        });
      }
    }
  } catch (error) {
    // silent
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  let book: MediaData | null = null;

  if (id.startsWith("book-")) {
    const bookNumber = parseInt(id.replace("book-", ""), 10);
    const sampleBook: MediaData = {
      shelf_type: "read",
      visibility: 1,
      item: {
        title: bookTitles[bookNumber - 1] || `图书${bookNumber}`,
        cover_image_url: "/assets/images/neodb/cover/dongwu-100-years.jpg",
        rating: 7.5,
        uuid: id,
        category: "book",
        download_url: `https://wwbes.lanzoue.com/iKG3R3d2v10b`,
      },
    };

    if (bookNumber === 1) {
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/no-forgiveness-no-future.png";
      sampleBook.item.download_url = `https://115cdn.com/s/swfbkgi3h6e?password=0121&#`;
    } else if (bookNumber === 2) {
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/jidushanbojue-dazhongma.png";
      sampleBook.item.download_url = `https://115cdn.com/s/swfqr173h6e?password=b7c3&#`;
      sampleBook.item.tablet_download_url = `https://115cdn.com/s/swfqr133h6e?password=r011&#`;
      sampleBook.item.kindle_download_url = `https://115cdn.com/s/swfqrx73h6e?password=of40&#`;
    } else if (bookNumber === 3) {
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/xiandewanxiao-liuzhenyun.png";
      sampleBook.item.download_url = `https://wwbes.lanzoue.com/ig25P3fmlhsh`;
      sampleBook.item.tablet_download_url = `https://wwbes.lanzoue.com/iR7Kb3fmlhyd`;
    } else if (bookNumber === 4) {
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/lundunmofashi-anheimofa-weiduoliyashuwa.jpg";
      sampleBook.item.download_url = `https://wwbes.lanzoue.com/iXYUz3e6hm8b`;
      sampleBook.item.tablet_download_url = `https://wwbes.lanzoue.com/iW7NZ3e6hlpc`;
    } else if (bookNumber === 5) {
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/tashan-tahai-fuhua.jpg";
      sampleBook.item.download_url = `https://wwbes.lanzoue.com/ihduM3elfdyb`;
      sampleBook.item.tablet_download_url = `https://wwbes.lanzoue.com/izrgk3elfcyf`;
    } else if (bookNumber === 6) {
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/xiejia-duanminggui-changmingbaisui-yi.jpg";
      sampleBook.item.download_url = `https://wwbes.lanzoue.com/iJu463dmclzc`;
      sampleBook.item.tablet_download_url = `https://wwbes.lanzoue.com/iHpH43dmclsf`;
    } else if (bookNumber === 7) {
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/shiji-simaqian-zhangdake.png";
      sampleBook.item.download_url = `https://wwbes.lanzoue.com/iID003d2qf5a`;
      sampleBook.item.password = "hgaz";
    } else if (bookNumber === 8) {
      sampleBook.item.cover_image_url =
        "/assets/images/neodb/cover/dongwu-100-years.jpg";
      sampleBook.item.download_url = `https://wwbes.lanzoue.com/iKG3R3d2v10b`;
    }

    book = sampleBook;
  } else {
    let filePath = path.join(
      process.cwd(),
      "public/assets/data/neodb/book.json",
    );
    if (!fs.existsSync(filePath)) {
      filePath = path.join(
        process.cwd(),
        "apps/gkBlog/public/assets/data/neodb/book.json",
      );
    }

    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(fileContent);
        const foundBook = jsonData.data.find(
          (item: MediaData) => item.item.uuid === id,
        );
        if (foundBook) {
          book = foundBook;
        }
      }
    } catch (error) {
      // silent
    }
  }

  if (!book) {
    return { notFound: true };
  }

  return { props: { book } };
};

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M10 3a1 1 0 011 1v7.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 11.586V4a1 1 0 011-1z" />
      <path d="M3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
    </svg>
  );
}

function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
    </svg>
  );
}

function MediaDetail({ book }: MediaDetailProps) {
  const router = useRouter();
  const [showQRCode, setShowQRCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(book.item.password as string);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Page
      frontMatter={{
        title: book.item.title,
        caption: "图书详情",
        description: "图书详情页面",
      }}
    >
      <div className={clsx("mx-auto max-w-2xl px-4 pb-12")}>
        {/* 封面卡片 */}
        <div className={clsx("relative mx-auto mb-8 flex justify-center")}>
          <div className={clsx("relative")}>
            {/* 封面背景光晕 */}
            <div
              className={clsx(
                "absolute -inset-4 rounded-2xl bg-gradient-to-b from-slate-200/60 to-transparent blur-2xl",
                "dark:from-slate-700/30",
              )}
            />
            <Image
              src={book.item.cover_image_url}
              alt={book.item.title}
              width={220}
              height={330}
              className={clsx(
                "relative rounded-lg shadow-xl ring-1 ring-slate-200/50",
                "dark:ring-slate-700/50",
                "transition-transform duration-300 hover:scale-[1.02]",
              )}
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>

        {/* 书名 */}
        <h1
          className={clsx(
            "mb-8 text-center text-2xl font-bold text-slate-800",
            "dark:text-slate-200",
            "sm:text-3xl",
          )}
        >
          {book.item.title}
        </h1>

        {/* 下载区域 */}
        <div
          className={clsx(
            "rounded-xl border border-slate-200 bg-white/60 p-6 backdrop-blur-sm",
            "dark:border-slate-700/60 dark:bg-slate-800/40",
          )}
        >
          <div className={clsx("flex flex-col gap-3")}>
            {/* 主下载按钮 */}
            <button
              type="button"
              onClick={() => handleDownload(book.item.download_url)}
              className={clsx(
                "group relative flex items-center gap-3 rounded-xl px-5 py-3.5 text-white transition-all active:scale-[0.99]",
                "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30",
                "dark:from-emerald-700 dark:to-teal-700 dark:shadow-emerald-900/30",
              )}
            >
              <span
                className={clsx(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20",
                )}
              >
                <DownloadIcon className="h-5 w-5" />
              </span>
              <span className={clsx("flex flex-col items-start")}>
                <span className={clsx("text-sm font-semibold")}>
                  下载电子书
                </span>
                <span className={clsx("text-xs text-white/70")}>标准版本</span>
              </span>
              <span
                className={clsx(
                  "ml-auto text-white/50 transition-transform group-hover:translate-x-0.5",
                )}
              >
                →
              </span>
            </button>

            {/* 平板版 & Kindle 版 */}
            {(book.item.tablet_download_url ||
              book.item.kindle_download_url) && (
              <div
                className={clsx(
                  "grid gap-2",
                  book.item.tablet_download_url && book.item.kindle_download_url
                    ? "grid-cols-2"
                    : "grid-cols-1",
                )}
              >
                {book.item.tablet_download_url && (
                  <button
                    type="button"
                    onClick={() =>
                      handleDownload(book.item.tablet_download_url as string)
                    }
                    className={clsx(
                      "group flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all active:scale-[0.99]",
                      "border border-slate-200 hover:border-violet-300 hover:bg-violet-50/50",
                      "dark:border-slate-700 dark:hover:border-violet-700 dark:hover:bg-violet-900/20",
                    )}
                  >
                    <span
                      className={clsx(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        "bg-violet-100 text-violet-600",
                        "dark:bg-violet-900/40 dark:text-violet-400",
                      )}
                    >
                      <DownloadIcon className="h-4 w-4" />
                    </span>
                    <span className={clsx("flex flex-col items-start")}>
                      <span
                        className={clsx(
                          "text-sm font-medium text-slate-700",
                          "dark:text-slate-300",
                        )}
                      >
                        平板版
                      </span>
                      <span
                        className={clsx(
                          "text-xs text-slate-400",
                          "dark:text-slate-500",
                        )}
                      >
                        大屏优化
                      </span>
                    </span>
                  </button>
                )}
                {book.item.kindle_download_url && (
                  <button
                    type="button"
                    onClick={() =>
                      handleDownload(book.item.kindle_download_url as string)
                    }
                    className={clsx(
                      "group flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all active:scale-[0.99]",
                      "border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50",
                      "dark:border-slate-700 dark:hover:border-amber-700 dark:hover:bg-amber-900/20",
                    )}
                  >
                    <span
                      className={clsx(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        "bg-amber-100 text-amber-600",
                        "dark:bg-amber-900/40 dark:text-amber-400",
                      )}
                    >
                      <DownloadIcon className="h-4 w-4" />
                    </span>
                    <span className={clsx("flex flex-col items-start")}>
                      <span
                        className={clsx(
                          "text-sm font-medium text-slate-700",
                          "dark:text-slate-300",
                        )}
                      >
                        Kindle 版
                      </span>
                      <span
                        className={clsx(
                          "text-xs text-slate-400",
                          "dark:text-slate-500",
                        )}
                      >
                        墨水屏优化
                      </span>
                    </span>
                  </button>
                )}
              </div>
            )}

            {/* 提取码 */}
            {book.item.password && (
              <div
                className={clsx(
                  "flex items-center justify-between rounded-lg px-4 py-2.5",
                  "bg-slate-50 dark:bg-slate-800/60",
                )}
              >
                <span
                  className={clsx(
                    "text-sm text-slate-500",
                    "dark:text-slate-400",
                  )}
                >
                  提取码：
                  <code
                    className={clsx(
                      "ml-1 rounded bg-slate-200/70 px-1.5 py-0.5 font-mono text-sm font-medium text-slate-700",
                      "dark:bg-slate-700 dark:text-slate-300",
                    )}
                  >
                    {book.item.password}
                  </code>
                </span>
                <button
                  type="button"
                  onClick={handleCopyPassword}
                  className={clsx(
                    "flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                    copied
                      ? ["text-emerald-600", "dark:text-emerald-400"]
                      : [
                          "text-slate-500 hover:bg-slate-200/70 hover:text-slate-700",
                          "dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300",
                        ],
                  )}
                >
                  <CopyIcon className="h-3.5 w-3.5" />
                  {copied ? "已复制" : "复制"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 支持 & 返回 */}
        <div className={clsx("mt-6 flex items-center justify-between")}>
          <button
            type="button"
            onClick={() => router.back()}
            className={clsx(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              "text-slate-600 hover:bg-slate-100",
              "dark:text-slate-400 dark:hover:bg-slate-800",
            )}
          >
            ← 返回
          </button>
          <button
            type="button"
            onClick={() => setShowQRCode((prev) => !prev)}
            className={clsx(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              showQRCode
                ? [
                    "bg-slate-200 text-slate-700",
                    "dark:bg-slate-700 dark:text-slate-300",
                  ]
                : [
                    "text-rose-600 hover:bg-rose-50",
                    "dark:text-rose-400 dark:hover:bg-rose-900/20",
                  ],
            )}
          >
            {showQRCode ? "收起" : "☕ 支持一下"}
          </button>
        </div>

        {/* 打赏二维码 */}
        {showQRCode && (
          <div
            className={clsx(
              "mt-4 rounded-xl border border-slate-200 bg-white/60 p-6 backdrop-blur-sm",
              "dark:border-slate-700/60 dark:bg-slate-800/40",
            )}
          >
            <div className={clsx("flex justify-center gap-8")}>
              <div className={clsx("flex flex-col items-center gap-2")}>
                <Image
                  src="/assets/images/qrcode/wechat.jpg"
                  alt="微信收款码"
                  width={160}
                  height={160}
                  className={clsx("rounded-lg")}
                />
                <span
                  className={clsx(
                    "text-xs text-slate-500",
                    "dark:text-slate-400",
                  )}
                >
                  微信
                </span>
              </div>
              <div className={clsx("flex flex-col items-center gap-2")}>
                <Image
                  src="/assets/images/qrcode/alipay.jpg"
                  alt="支付宝收款码"
                  width={160}
                  height={160}
                  className={clsx("rounded-lg")}
                />
                <span
                  className={clsx(
                    "text-xs text-slate-500",
                    "dark:text-slate-400",
                  )}
                >
                  支付宝
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

export default MediaDetail;
