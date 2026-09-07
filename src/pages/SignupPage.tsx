import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import DarkModeToggle from "../components/DarkModeToggle";
import { signup } from "../utils/Auth";
import "./AuthPage.css";

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!passwordRules.uppercase) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!passwordRules.number) {
      setError("Password must contain at least one number.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("Please agree to the Terms & Conditions.");
      return;
    }

    try {
      setLoading(true);

      const result = await signup(name, email, password);

      if (!result.success) {
        setError(result.message);
        return;
      }

      setSuccess("Account created successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
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
            <p>Start your crypto journey</p>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card__header">
            <h2>Create account</h2>
            <p>Build your personalized crypto watchlist.</p>
          </div>

          {error && (
            <div className="auth-message auth-message--error">{error}</div>
          )}

          {success && (
            <div className="auth-message auth-message--success">{success}</div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="name">Full name</label>

              <div className="auth-input-wrapper">
                <User size={18} />

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="signup-email">Email address</label>

              <div className="auth-input-wrapper">
                <Mail size={18} />

                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="signup-password">Password</label>

              <div className="auth-input-wrapper">
                <LockKeyhole size={18} />

                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
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

              <div className="password-rules">
                <p className={passwordRules.length ? "valid" : ""}>
                  <Check size={14} />
                  At least 8 characters
                </p>

                <p className={passwordRules.uppercase ? "valid" : ""}>
                  <Check size={14} />
                  One uppercase letter
                </p>

                <p className={passwordRules.number ? "valid" : ""}>
                  <Check size={14} />
                  One number
                </p>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="confirm-password">Confirm password</label>

              <div className="auth-input-wrapper">
                <LockKeyhole size={18} />

                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowConfirmPassword((value) => !value)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <label className="auth-checkbox auth-checkbox--terms">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />

              <span>
                I agree to the <button type="button">Terms & Conditions</button>
              </span>
            </label>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="auth-bottom-text">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
