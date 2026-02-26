import clsx from "clsx";
import { useEffect, useState } from "react";

import Barrage from "@/components/CommentBarrage";
import WalineComments from "@/components/WalineComments";

import useWaline from "@/hooks/useWaline";

interface CommentType {
  id: string;
  nick: string;
  commentText: string;
  avatar?: string;
}

const PAGE_SIZE = 50;
const FETCH_INTERVAL = 5 * 60 * 1000;

function MessagesContents() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const { walineLoaded, serverURL } = useWaline();

  const fetchBarrageComments = async () => {
    if (!serverURL) {
      setComments([]);
      return;
    }

    try {
      const res = await fetch(
        `${serverURL}/api/comment?path=/feedback&pageSize=${PAGE_SIZE}&page=1&sortBy=insertedAt_desc`,
      );
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      const list = Array.isArray(data?.data) ? data.data : [];
      setComments(
        list.map((c: any) => ({
          id: c.objectId || c._id || String(Math.random()),
          nick: c.nick || "匿名",
          commentText: (c.comment || c.orig || "").replace(/<[^>]*>/g, ""),
          avatar: c.avatar,
        })),
      );
      setFetchError(false);
    } catch {
      setFetchError(true);
    }
  };

  useEffect(() => {
    if (!walineLoaded) return undefined;

    fetchBarrageComments();
    const interval = setInterval(fetchBarrageComments, FETCH_INTERVAL);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walineLoaded]);

  return (
    <div className={clsx("content-wrapper")}>
      {!fetchError ? (
        <Barrage comments={comments} speed={80} density={1} />
      ) : (
        <div className="text-center text-red-500">加载弹幕失败，请稍后再试</div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">发表留言</h2>
        <WalineComments />
      </div>
    </div>
  );
}

export default MessagesContents;
