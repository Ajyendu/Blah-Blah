import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Mail } from "lucide-react";
import AuthLeftPanel from "../components/AuthLeftPanel";
import "./AuthPage.css";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="auth-page">
      <Link to="/" className="auth-page__logo" aria-label="Blah Blah">
        <img src="/logo.png" alt="Blah Blah" className="auth-page__logo-img" />
      </Link>
      <div className="auth-card">
        <AuthLeftPanel />

        <div className="auth-card__right">
          <h1 className="auth-card__title">Login</h1>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="login-email">
                Email
              </label>
              <div className="auth-form__input-wrap">
                <Mail className="auth-form__icon w-[18px] h-[18px]" />
                <input
                  id="login-email"
                  type="email"
                  className="auth-form__input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="login-password">
                Password
              </label>
              <div className="auth-form__input-wrap">
                {showPassword ? (
                  <EyeOff className="auth-form__icon w-[18px] h-[18px]" />
                ) : (
                  <Eye className="auth-form__icon w-[18px] h-[18px]" />
                )}
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="auth-form__input auth-form__input--with-right-btn"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-form__toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="auth-form__forgot">
                <button
                  type="button"
                  className="auth-form__forgot-btn"
                  onClick={() => toast("Coming soon", { icon: "🔜" })}
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-form__submit"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="inline w-5 h-5 animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </button>

            <p className="auth-form__footer">
              Don&apos;t have an account?{" "}
              <Link to="/signup">Sign Up here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
