import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "ng-focus-mode";

function useFocusMode() {
  const [focusMode, setFocusModeState] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored !== null) {
        setFocusModeState(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to read focus mode from local storage", e);
    }
  }, []);

  const setFocusMode = (value: boolean | ((val: boolean) => boolean)) => {
    setFocusModeState((prev) => {
      const newValue = value instanceof Function ? value(prev) : value;
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
      } catch (e) {
        console.error("Failed to write focus mode to local storage", e);
      }
      return newValue;
    });
  };

  return {
    focusMode,
    setFocusMode,
  };
}

export default useFocusMode;
