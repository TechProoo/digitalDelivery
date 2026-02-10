import LoaderAnim from "./LoaderAnim";

type AppLoaderProps = {
  label?: string;
};

export default function AppLoader({ label = "Loading..." }: AppLoaderProps) {
  return (
    <div className="min-h-screen bg-(--bg-primary) flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-3">
        <LoaderAnim />
        <div className="text-sm text-(--text-tertiary)" aria-live="polite">
          {label}
        </div>
      </div>
    </div>
  );
}
