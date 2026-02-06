import React, { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Logo from "../assets/logo_2.png";
import { useAuth } from "../auth/AuthContext";
import { forgotPassword } from "../api/auth";

const ForgotPassword = () => {
  const { isAuthenticated, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [debugResetLink, setDebugResetLink] = useState<string | null>(null);

  const normalizedEmail = useMemo(() => email.trim(), [email]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-(--bg-primary) flex items-center justify-center text-(--text-primary)">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);
    setDebugResetLink(null);

    setIsSubmitting(true);
    try {
      const result = await forgotPassword({ email: normalizedEmail });
      setSuccess(true);
      if (result?.resetLink) {
        setDebugResetLink(result.resetLink);
      }
    } catch (err: any) {
      setError(err?.message ?? "Request failed. Please try again.");
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
                  Forgot Password
                </h1>
                <p className="text-center text-(--text-tertiary)">
                  Enter your email and we’ll send a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 mt-10">
                {error ? (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                ) : null}

                {success ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                    If an account exists for that email, a reset link was sent.
                  </div>
                ) : null}

                {debugResetLink ? (
                  <div className="rounded-xl border border-(--border-soft) bg-(--bg-primary) px-4 py-3 text-sm text-(--text-primary)">
                    <div className="text-(--text-tertiary) mb-2">
                      Dev reset link:
                    </div>
                    <a
                      className="text-(--accent-sky) hover:underline break-all"
                      href={debugResetLink}
                    >
                      {debugResetLink}
                    </a>
                  </div>
                ) : null}

                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-tertiary)">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3 bg-(--bg-primary) border border-(--border-soft) rounded-xl text-(--text-primary) placeholder:text-(--text-tertiary) focus:outline-none focus:border-(--accent-sky) transition"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-(--bg-tertiary) text-(--text-primary) border border-(--border-soft) font-semibold shadow-lg hover:opacity-90 transition"
                >
                  {isSubmitting ? "Sending..." : "Send reset link"}
                </button>

                <div className="text-center text-sm text-(--text-secondary)">
                  Remembered your password?{" "}
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

export default ForgotPassword;
