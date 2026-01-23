export type Theme = "light" | "dark";

const STORAGE_KEY = "dl.theme";

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

export function getStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

export function getSystemTheme(): Theme {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return "dark";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getAppliedTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return isTheme(value) ? value : (getStoredTheme() ?? getSystemTheme());
}

export function applyTheme(theme: Theme, opts?: { persist?: boolean }) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  const persist = opts?.persist ?? true;
  if (!persist) return;

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore
  }
}

export function toggleTheme(current: Theme): Theme {
  return current === "dark" ? "light" : "dark";
}

export function initTheme() {
  const stored = getStoredTheme();
  const theme = stored ?? getSystemTheme();
  applyTheme(theme, { persist: false });
}
