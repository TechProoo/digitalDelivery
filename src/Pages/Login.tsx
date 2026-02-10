import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo_2.png";
import { useAuth } from "../auth/AuthContext";
import AppLoader from "../components/loader/AppLoader";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <AppLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setIsSubmitting(true);
    try {
      await login({
        email: formData.email,
        password: formData.password,
      });

      const fromPath = (location.state as any)?.from?.pathname as
        | string
        | undefined;
      navigate(fromPath || "/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Login failed. Please try again.");
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
            {/* Form Card */}
            <div className="bg-(--bg-secondary) md:w-100 m-auto rounded-xl shadow-strong px-8 py-5">
              <div className="form_header">
                <div className="signup_logo flex justify-center items-center">
                  <div className="flex flex-col items-center">
                    <img className="w-30 m-auto" src={Logo} alt="" />
                    <h1 className="text-3xl text-center header -mt-2.5">
                      Welcome Back
                    </h1>
                    <p className="text-center text-(--text-tertiary)">
                      Sign in to your account to continue shipping with us.
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5 mt-10">
                {error ? (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                ) : null}
                {/* Email */}
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
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3 bg-(--bg-primary) border border-(--border-soft) rounded-xl text-(--text-primary) placeholder:text-(--text-tertiary) focus:outline-none focus:border-(--accent-sky) transition"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-tertiary)">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-11 py-3 bg-(--bg-primary) border border-(--border-soft) rounded-xl text-(--text-primary) placeholder:text-(--text-tertiary) focus:outline-none focus:border-(--accent-sky) transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-tertiary) hover:text-(--text-primary) transition"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex items-center justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-(--accent-sky) hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-(--bg-tertiary) text-(--text-primary) border border-(--border-soft) font-semibold shadow-lg hover:opacity-90 transition"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-(--border-soft)"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-(--bg-secondary) text-(--text-tertiary)">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-1 gap-3">
                <button className="py-3 px-4 border border-(--border-soft) rounded-xl text-(--text-primary) hover:bg-(--hover-overlay) transition flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
              </div>

              {/* Signup Link */}
              <div className="mt-6 text-center text-sm text-(--text-secondary)">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-(--accent-sky) font-semibold hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
