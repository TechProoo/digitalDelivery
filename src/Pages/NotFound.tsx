import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-(--bg-primary) flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-(--border-soft) bg-(--bg-secondary) p-8 shadow-strong">
        <div className="text-center">
          <div className="text-6xl font-extrabold text-(--text-primary)">
            404
          </div>
          <div className="mt-2 text-xl font-semibold text-(--text-primary)">
            Page not found
          </div>
          <p className="mt-2 text-sm text-(--text-tertiary)">
            The page you’re looking for doesn’t exist or was moved.
          </p>

          <div className="mt-6 rounded-xl border border-(--border-soft) bg-(--bg-primary) px-4 py-3 text-left text-xs text-(--text-tertiary)">
            <div className="font-medium text-(--text-secondary)">
              Requested URL
            </div>
            <div className="break-all">
              {location.pathname + location.search}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/"
              className="w-full py-3 rounded-xl bg-(--bg-tertiary) text-(--text-primary) border border-(--border-soft) font-semibold shadow-lg hover:opacity-90 transition text-center"
            >
              Go to Home
            </Link>
            <Link
              to="/contact"
              className="w-full py-3 rounded-xl bg-transparent text-(--text-primary) border border-(--border-soft) font-semibold hover:bg-(--bg-primary) transition text-center"
            >
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
