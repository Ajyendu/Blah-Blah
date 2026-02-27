import { MessageCircle, Users, User, Settings, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import "./Sidebar.css";

const NAV_ITEMS = [
  { id: "all", label: "All chats", Icon: MessageCircle, badge: true },
  { id: "friends", label: "Friends", Icon: Users, badge: false },
  { id: "profile", label: "Profile", Icon: User, badge: false },
  { id: "edit", label: "Edit", Icon: Settings, badge: false },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCountByChatId } = useChatStore();
  const { logout } = useAuthStore();

  const activeNav =
    location.pathname === "/friends"
      ? "friends"
      : location.pathname === "/profile"
        ? "profile"
        : location.pathname === "/settings"
          ? "edit"
          : "all";

  const handleNavClick = (id) => {
    if (id === "profile") navigate("/profile");
    if (id === "edit") navigate("/settings");
    if (id === "friends") navigate("/friends");
    if (id === "all") navigate("/");
  };

  const unreadChatCount = unreadCountByChatId
    ? Object.keys(unreadCountByChatId).filter(
        (cid) => (unreadCountByChatId[cid] ?? 0) > 0,
      ).length
    : 0;
  const badgeCount =
    unreadChatCount > 0
      ? unreadChatCount > 99
        ? "99+"
        : String(unreadChatCount)
      : null;

  return (
    <aside className="sidebar-ref">
      <div className="sidebar-ref__logo">
        <div className="sidebar-ref__logo-wrap">
          <img
            src="/logo.png"
            alt="Blah Blah"
            className="sidebar-ref__logo-img"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextElementSibling?.classList.remove(
                "sidebar-ref__logo-fallback--hide",
              );
            }}
          />
          <span
            className="sidebar-ref__logo-fallback sidebar-ref__logo-fallback--hide"
            aria-hidden
          >
            BLAH BLAH
          </span>
        </div>
      </div>

      <nav className="sidebar-ref__nav">
        {NAV_ITEMS.map(({ id, label, Icon, badge }) => (
          <button
            key={id}
            onClick={() => handleNavClick(id)}
            className={`sidebar-ref__nav-item ${activeNav === id ? "active" : ""}`}
          >
            <span className="sidebar-ref__nav-icon-wrap">
              <Icon size={22} />
              {badge && badgeCount != null && (
                <span className="sidebar-ref__nav-badge">{badgeCount}</span>
              )}
            </span>
            <span className="sidebar-ref__nav-label">{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-ref__bottom">
        <button onClick={() => logout?.()} className="sidebar-ref__bottom-item">
          <LogOut size={22} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
