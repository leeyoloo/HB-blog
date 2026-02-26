import { useCallback, useEffect, useRef, useState } from "react";

interface WalineComment {
  objectId: string;
  nick: string;
  mail: string;
  link: string;
  comment: string;
  insertedAt: string;
  avatar: string;
  url: string;
  orig?: string;
}

const WALINE_SERVER_URL = process.env.NEXT_PUBLIC_WALINE_SERVER_URL || "";

function useWaline() {
  const [recentComments, setRecentComments] = useState<WalineComment[]>([]);
  const [walineLoaded, setWalineLoaded] = useState(false);
  const walineRef = useRef<typeof import("@waline/client") | null>(null);

  useEffect(() => {
    if (!WALINE_SERVER_URL) return;

    import("@waline/client").then((mod) => {
      walineRef.current = mod;
      setWalineLoaded(true);
    });
  }, []);

  const initWaline = useCallback((el: string) => {
    if (!WALINE_SERVER_URL || !walineRef.current) return undefined;

    return walineRef.current.init({
      el,
      serverURL: WALINE_SERVER_URL,
      dark: "html.dark",
      lang: "zh-CN",
      emoji: false,
      search: false,
      pageSize: 10,
      locale: {
        placeholder: "说点什么吧～ 支持匿名评论，无需登录 ✨",
        sofa: "快来发表第一条评论吧～",
        nick: "昵称（选填）",
        mail: "邮箱（选填）",
        link: "网址（选填）",
      },
      requiredMeta: [],
      login: "enable",
      reaction: false,
    });
  }, []);

  const fetchRecentComments = useCallback(async (count = 3) => {
    if (!WALINE_SERVER_URL || !walineRef.current) return [];

    try {
      const result = await walineRef.current.RecentComments({
        serverURL: WALINE_SERVER_URL,
        count,
      });
      setRecentComments(
        Array.isArray(result.comments)
          ? (result.comments as unknown as WalineComment[])
          : [],
      );
      result.destroy();
      return result.comments;
    } catch {
      return [];
    }
  }, []);

  return {
    walineLoaded,
    recentComments,
    fetchRecentComments,
    initWaline,
    serverURL: WALINE_SERVER_URL,
  };
}

export default useWaline;
