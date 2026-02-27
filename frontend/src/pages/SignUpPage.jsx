import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  User,
} from "lucide-react";
import AuthLeftPanel from "../components/AuthLeftPanel";
import { getRandomAvatarByGender } from "../lib/defaultAvatar.js";
import "./AuthPage.css";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "male",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const profilePic = getRandomAvatarByGender(formData.gender);
    signup({ ...formData, profilePic });
  };

  return (
    <div className="auth-page">
      <Link to="/" className="auth-page__logo" aria-label="Blah Blah">
        <img src="/logo.png" alt="Blah Blah" className="auth-page__logo-img" />
      </Link>
      <div className="auth-card">
        <AuthLeftPanel />

        <div className="auth-card__right">
          <h1 className="auth-card__title">Sign Up</h1>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="signup-name">
                Full Name
              </label>
              <div className="auth-form__input-wrap">
                <User className="auth-form__icon w-[18px] h-[18px]" />
                <input
                  id="signup-name"
                  type="text"
                  className="auth-form__input"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="signup-email">
                Email
              </label>
              <div className="auth-form__input-wrap">
                <Mail className="auth-form__icon w-[18px] h-[18px]" />
                <input
                  id="signup-email"
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
              <label className="auth-form__label" htmlFor="signup-password">
                Password
              </label>
              <div className="auth-form__input-wrap">
                {showPassword ? (
                  <EyeOff className="auth-form__icon w-[18px] h-[18px]" />
                ) : (
                  <Eye className="auth-form__icon w-[18px] h-[18px]" />
                )}
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  className="auth-form__input auth-form__input--with-right-btn"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  autoComplete="new-password"
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
            </div>

            <div className="auth-form__group auth-form__group--row">
              <span className="auth-form__label">Gender</span>
              <div className="auth-form__radios">
                <label className="auth-form__radio-label">
                  <input
                    type="radio"
                    name="signup-gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="auth-form__radio"
                  />
                  <span>Male</span>
                </label>
                <label className="auth-form__radio-label">
                  <input
                    type="radio"
                    name="signup-gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="auth-form__radio"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="auth-form__submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="inline w-5 h-5 animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <p className="auth-form__footer">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
