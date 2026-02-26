import clsx from "clsx";
import { useEffect, useRef } from "react";

import useWaline from "@/hooks/useWaline";

function WalineComments() {
  const { walineLoaded, initWaline } = useWaline();
  const instanceRef = useRef<ReturnType<typeof initWaline>>(undefined);

  useEffect(() => {
    if (!walineLoaded) return undefined;

    instanceRef.current = initWaline("#waline");

    return () => {
      if (instanceRef.current && "destroy" in instanceRef.current) {
        (instanceRef.current as { destroy: () => void }).destroy();
      }
    };
  }, [walineLoaded, initWaline]);

  return (
    <div className={clsx("mt-8")}>
      <div id="waline" />
    </div>
  );
}

export default WalineComments;
