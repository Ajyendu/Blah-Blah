import { Link } from "react-router-dom";

const AuthLeftPanel = () => {
  return (
    <div className="auth-card__left">
      <Link to="/" className="auth-card__brand" aria-label="Blah Blah" />
      <div className="auth-card__illus">
        <img
          src="/new.jpeg"
          alt=""
          className="auth-card__illus-img"
        />
      </div>
    </div>
  );
};

export default AuthLeftPanel;
