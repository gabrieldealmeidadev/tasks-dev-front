import { useEffect, useState } from "react";

export function DarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="px-3 py-1 border border-custom rounded text-sm cursor-pointer"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
