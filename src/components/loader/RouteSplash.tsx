import { useEffect, useState } from "react";
import AppLoader from "./AppLoader";

type RouteSplashProps = {
  delayMs?: number;
  label?: string;
  children: React.ReactNode;
};

export default function RouteSplash({
  delayMs = 500,
  label,
  children,
}: RouteSplashProps) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setShowLoader(false), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs]);

  if (showLoader) {
    return <AppLoader label={label ?? "Loading..."} />;
  }

  return <>{children}</>;
}
