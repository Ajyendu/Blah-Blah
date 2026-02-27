/**
 * Main screen preview: exact copy of the app layout (sidebar + chat list + main area).
 * Same structure and class names as HomePage + Sidebar + ChatListPanel + NoChatSelected.
 * Theme passed as CSS vars on wrapper.
 */
import { MessageCircle, Users, User, Settings, LogOut, Search } from "lucide-react";
import { DEFAULT_AVATAR_URL } from "../lib/defaultAvatar.js";
import "./Sidebar.css";
import "./ChatListPanel.css";
import "../pages/Homepage.css";
import "./NoChatSelected.css";
import "./MainScreenPreview.css";

const NAV_ITEMS = [
  { id: "all", label: "All chats", Icon: MessageCircle, badge: true },
  { id: "friends", label: "Friends", Icon: Users, badge: false },
  { id: "profile", label: "Profile", Icon: User, badge: false },
  { id: "edit", label: "Edit", Icon: Settings, badge: false },
];

const MOCK_CHATS = [
  { id: "1", name: "Alex", time: "2m", preview: "Hey there!", selected: true },
  { id: "2", name: "Sam", time: "1h", preview: "See you later", selected: false },
];

const MainScreenPreview = ({ theme }) => {
  if (!theme) return null;

  const vars = {
    "--app-bg": theme.appBg,
    "--primary": theme.primary,
    "--accent": theme.accent,
    "--accent-dark": theme.accentDark || theme.accent,
    "--dark-bg": theme.darkBg != null ? theme.darkBg : "#000000",
    "--bubble-mine": theme.bubbleMine,
    "--bubble-other": theme.bubbleOther,
    "--text-primary": theme.textPrimary,
    "--text-secondary": theme.textSecondary,
    "--chat-bg": theme.chatBg,
    "--page-bg": theme.pageBg,
  };

  return (
    <div className="main-screen-preview" style={vars}>
      <div className="main-screen-preview__scale">
        <div className="app-shell h-screen w-screen flex main-screen-preview__shell">
          <div className="flex flex-1 m-6 overflow-hidden app-card main-screen-preview__card">
            {/* SIDEBAR - same structure as Sidebar.jsx */}
            <div className="flex-shrink-0">
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
                      type="button"
                      className={`sidebar-ref__nav-item ${id === "all" ? "active" : ""}`}
                    >
                      <span className="sidebar-ref__nav-icon-wrap">
                        <Icon size={22} />
                        {badge && (
                          <span className="sidebar-ref__nav-badge">2</span>
                        )}
                      </span>
                      <span className="sidebar-ref__nav-label">{label}</span>
                    </button>
                  ))}
                </nav>

                <div className="sidebar-ref__bottom">
                  <button type="button" className="sidebar-ref__bottom-item">
                    <LogOut size={22} />
                    <span>Log out</span>
                  </button>
                </div>
              </aside>
            </div>

            {/* Combined block: chat list + main - same as HomePage */}
            <div className="app-content-wrap flex-1 flex min-w-0 main-screen-preview__content">
              <div className="flex-shrink-0">
                {/* Exact structure from ChatListPanel.jsx */}
                <div className="chat-list-panel">
                  <div className="chat-list-panel__search">
                    <Search className="chat-list-panel__search-icon" size={18} />
                    <input
                      type="text"
                      placeholder="Search"
                      readOnly
                      className="chat-list-panel__search-input"
                    />
                  </div>

                  <div className="chat-list-panel__new-chat">
                    <button
                      type="button"
                      className="chat-list-panel__new-chat-btn"
                    >
                      + New Chat
                    </button>
                  </div>

                  <div className="chat-list-panel__list">
                    {MOCK_CHATS.map((chat) => (
                      <button
                        key={chat.id}
                        type="button"
                        className={`chat-list-panel__item ${chat.selected ? "selected" : ""}`}
                      >
                        <div className="chat-list-panel__avatar-wrap">
                          <img
                            src={DEFAULT_AVATAR_URL}
                            alt={chat.name}
                            className="chat-list-panel__avatar"
                          />
                        </div>
                        <div className="chat-list-panel__body">
                          <div className="chat-list-panel__row">
                            <span className="chat-list-panel__name">
                              {chat.name}
                            </span>
                            <span className="chat-list-panel__time">
                              {chat.time}
                            </span>
                          </div>
                          <p className="chat-list-panel__preview">
                            {chat.preview}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* MAIN CHAT - same as HomePage when no chat selected */}
              <div className="flex-1 flex flex-col min-w-0">
                <div className="no-chat-ref">
                  <img
                    src="/wall.png"
                    alt=""
                    className="no-chat-ref__illus"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreenPreview;
