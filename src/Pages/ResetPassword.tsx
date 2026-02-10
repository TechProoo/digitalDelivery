import React, { useMemo, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Logo from "../assets/logo_2.png";
import { useAuth } from "../auth/AuthContext";
import { resetPassword } from "../api/auth";
import AppLoader from "../components/loader/AppLoader";

function getTokenFromLocation(location: ReturnType<typeof useLocation>) {
  const qsToken = new URLSearchParams(location.search).get("token");
  if (qsToken) return qsToken;

  // Some email clients may preserve token in the hash.
  const hash = location.hash?.startsWith("#") ? location.hash.slice(1) : "";
  const hashToken = new URLSearchParams(hash).get("token");
  return hashToken || "";
}

const ResetPassword = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const token = useMemo(() => {
    return getTokenFromLocation(location) || params.token || "";
  }, [location, params.token]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (isLoading) {
    return <AppLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    if (!token) {
      setError("Reset token is missing. Please request a new reset link.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword({ token, newPassword: newPassword.trim() });
      setSuccess(true);
      setNewPassword("");
      setConfirmPassword("");

      // Give the user a short moment to read success.
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 800);
    } catch (err: any) {
      setError(err?.message ?? "Reset failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-(--bg-primary) grid grid-cols-12">
      <div className="md:col-span-6 min-h-screen hidden md:block">
        <div className="login_img min-h-screen"></div>
      </div>

      <div className="md:col-span-6 col-span-12">
        <div className="flex justify-center md:p-10 p-3">
          <div>
            <div className="bg-(--bg-secondary) md:w-100 m-auto rounded-xl shadow-strong px-8 py-5">
              <div className="flex flex-col items-center">
                <img className="w-30 m-auto" src={Logo} alt="" />
                <h1 className="text-3xl text-center header -mt-2.5">
                  Reset Password
                </h1>
                <p className="text-center text-(--text-tertiary)">
                  Create a new password for your account.
                </p>
              </div>

              {!token ? (
                <div className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                  Reset token is missing. Please request a new reset link.
                  <div className="mt-2">
                    <Link
                      to="/forgot-password"
                      className="text-(--accent-sky) hover:underline"
                    >
                      Go to forgot password
                    </Link>
                  </div>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-5 mt-10">
                {error ? (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                ) : null}

                {success ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                    Password reset successful. Redirecting to login...
                  </div>
                ) : null}

                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-tertiary)">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-11 py-3 bg-(--bg-primary) border border-(--border-soft) rounded-xl text-(--text-primary) placeholder:text-(--text-tertiary) focus:outline-none focus:border-(--accent-sky) transition"
                      required
                      autoComplete="new-password"
                      disabled={!token}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-tertiary) hover:text-(--text-primary) transition"
                      disabled={!token}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-(--text-tertiary)">
                    Must be 8+ chars and include upper, lower, and a number.
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-tertiary)">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-11 py-3 bg-(--bg-primary) border border-(--border-soft) rounded-xl text-(--text-primary) placeholder:text-(--text-tertiary) focus:outline-none focus:border-(--accent-sky) transition"
                      required
                      autoComplete="new-password"
                      disabled={!token}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-tertiary) hover:text-(--text-primary) transition"
                      disabled={!token}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !token}
                  className="w-full py-3 rounded-xl bg-(--bg-tertiary) text-(--text-primary) border border-(--border-soft) font-semibold shadow-lg hover:opacity-90 transition"
                >
                  {isSubmitting ? "Resetting..." : "Reset password"}
                </button>

                <div className="text-center text-sm text-(--text-secondary)">
                  <Link
                    to="/login"
                    className="text-(--accent-sky) font-semibold hover:underline"
                  >
                    Back to login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
