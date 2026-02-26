import { useEffect, useState } from "react";

import { Content } from "@/types";

export const useAnimateContent = (content: Array<Content>) => {
  const [currentState, setCurrentState] = useState<Content>(content[0]);
  const [isUserClick, setIsUserClick] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentState((prev) => {
          const idx = content.indexOf(prev);
          return content[idx < content.length - 1 ? idx + 1 : 0];
        });
      },
      isUserClick ? 1000 : 1500,
    );

    const timeout = isUserClick
      ? setTimeout(() => setIsUserClick(false), 5000)
      : null;

    return () => {
      clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [content, isUserClick]);

  return { setIsUserClick, currentState, setCurrentState };
};
