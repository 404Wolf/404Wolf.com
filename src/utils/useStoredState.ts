import { useEffect, useState } from "react";

const useStoredState = (key: string, value: any) => {
  const [state, setState] = useState<any>(value);
  const [setting, setSetting] = useState(true);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) setState(storedValue);
    else setState(value);
    setSetting(false);
  }, []);

  return [
    state,
    (value: any) => {
      localStorage.setItem(key, value);
      setState(value);
    },
    setting,
  ];
};

export default useStoredState;
