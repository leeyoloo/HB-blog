import { useCallback, useEffect } from "react";

function useShortcut(key: string, callback: (event: KeyboardEvent) => void) {
  // 稳定化 callback 引用，避免每次渲染都重新注册事件监听器
  const stableCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 忽略在输入框中的按键
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.code === key) {
        stableCallback(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, stableCallback]);
}

export default useShortcut;
