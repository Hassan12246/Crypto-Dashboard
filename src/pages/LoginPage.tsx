import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import DarkModeToggle from "../components/DarkModeToggle";
import { login } from "../utils/Auth";
import "./AuthPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const result = await login(email, password, rememberMe);

      if (!result.success) {
        setError(result.message);
        return;
      }

      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-page__content">
        <div className="auth-page__toolbar">
          <DarkModeToggle />
        </div>

        <div className="auth-brand">
          <div className="auth-brand__logo">₿</div>

          <div>
            <h1>Crypto Dashboard</h1>
            <p>Track the market with confidence</p>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card__header">
            <h2>Welcome back</h2>
            <p>Sign in to continue to your dashboard.</p>
          </div>

          {error && (
            <div className="auth-message auth-message--error">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="email">Email address</label>

              <div className="auth-input-wrapper">
                <Mail size={18} />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="password">Password</label>

                <button
                  type="button"
                  className="auth-forgot"
                  onClick={() =>
                    setError(
                      "Password recovery is not connected because this is a frontend demo.",
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>

              <div className="auth-input-wrapper">
                <LockKeyhole size={18} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />

              <span>Remember me</span>
            </label>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="auth-demo-button"
            onClick={() => {
              setEmail("demo@cryptodashboard.com");
              setPassword("Demo1234");
              setError("Demo credentials filled. Click Sign in.");
            }}
          >
            Use demo account
          </button>

          <p className="auth-bottom-text">
            Don't have an account? <Link to="/signup">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
