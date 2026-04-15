/**
 * Main screen preview: exact copy of the app layout (sidebar + chat list + main area).
 * Theme passed as CSS vars on wrapper. Fourth nav control toggles light/dark for the preview only.
 */
import { useState, useEffect } from "react";
import {
  MessageCircle,
  Users,
  User,
  Sun,
  Moon,
  LogOut,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Clock,
  Send,
  Calendar,
  ArrowDownAZ,
  UserMinus,
  Pencil,
  Share2,
  Copy,
} from "lucide-react";
import { DEFAULT_AVATAR_URL, ANIMAL_AVATAR_URLS } from "../lib/defaultAvatar.js";
import "./Sidebar.css";
import "./ChatListPanel.css";
import "./ChatHeader.css";
import "./ChatContainer.css";
import "./MessageInput.css";
import "./FriendsPanel.css";
import "../pages/ProfilePage.css";
import "../pages/Homepage.css";
import "../pages/SettingsPage.css";
import "./MainScreenPreview.css";
import { DEFAULT_THEME, DARK_THEME } from "../store/useThemeStore.js";

const NAV_ITEMS = [
  { id: "all", label: "All chats", Icon: MessageCircle, badge: true },
  { id: "friends", label: "Friends", Icon: Users, badge: false },
  { id: "profile", label: "Profile", Icon: User, badge: false },
];

const MOCK_CHATS = [
  { id: "1", name: "Johnny", time: "1m", preview: "Hey", selected: true, online: true, avatar: ANIMAL_AVATAR_URLS[0] },
  { id: "2", name: "Sam", time: "1h", preview: "See you later", selected: false, online: false, avatar: ANIMAL_AVATAR_URLS[1] },
];

const MOCK_FRIENDS = [
  { id: "f1", name: "Johnny", avatar: ANIMAL_AVATAR_URLS[0], online: true },
  { id: "f2", name: "Sam", avatar: ANIMAL_AVATAR_URLS[1], online: false },
];

const MOCK_MESSAGES = [
  { id: "m1", text: "Hi", mine: false },
  { id: "m2", text: "Hey", mine: true, seenLabel: "Seen at 19:58 today" },
];

const DARK_BG_VALUES = ["#0f0f0f", "#000000", "#0a0a0a", "#111111", "#0d0d0d", "#141414"];

const MainScreenPreview = ({ theme, isMobile }) => {
  const [activeNav, setActiveNav] = useState("all");
  /** null = follow `theme` prop; true/false = force dark/light preset in this preview only */
  const [previewDarkOverride, setPreviewDarkOverride] = useState(null);

  useEffect(() => {
    setPreviewDarkOverride(null);
  }, [theme]);

  if (!theme) return null;

  const displayTheme =
    previewDarkOverride === true
      ? DARK_THEME
      : previewDarkOverride === false
        ? DEFAULT_THEME
        : theme;

  const displayIsDark =
    DARK_BG_VALUES.includes(displayTheme.appBg) ||
    DARK_BG_VALUES.includes(displayTheme.pageBg) ||
    DARK_BG_VALUES.includes(displayTheme.chatBg);

  const vars = {
    "--app-bg": displayTheme.appBg,
    "--primary": displayTheme.primary,
    "--accent": displayTheme.accent,
    "--accent-dark": displayTheme.accentDark || displayTheme.accent,
    "--dark-bg": displayTheme.darkBg != null ? displayTheme.darkBg : "#000000",
    "--bubble-mine": displayTheme.bubbleMine,
    "--bubble-other": displayTheme.bubbleOther,
    "--text-primary": displayTheme.textPrimary,
    "--text-secondary": displayTheme.textSecondary,
    "--chat-bg": displayTheme.chatBg,
    "--panel-bg": displayTheme.panelBg ?? "#ffffff",
    "--page-bg": displayTheme.pageBg,
  };

  return (
    <div className={`main-screen-preview ${isMobile ? "main-screen-preview--mobile" : ""}`} style={vars}>
      <div className="main-screen-preview__scale main-screen-preview__scale--interactive">
        <div className="app-shell h-screen w-screen flex main-screen-preview__shell">
          <div className={`flex flex-1 m-6 overflow-hidden app-card main-screen-preview__card ${isMobile ? "main-screen-preview__card--mobile" : ""}`}>
            {/* SIDEBAR - clickable nav; on mobile shown at bottom */}
            <div className={isMobile ? "app-card__sidebar flex-shrink-0" : "flex-shrink-0"}>
              <aside className={`sidebar-ref ${isMobile ? "sidebar-ref--mobile" : ""}`}>
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
                      onClick={() => setActiveNav(id)}
                      className={`sidebar-ref__nav-item ${activeNav === id ? "active" : ""}`}
                    >
                      <span className="sidebar-ref__nav-icon-wrap">
                        <Icon size={22} />
                      </span>
                      <span className="sidebar-ref__nav-label">{label}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setPreviewDarkOverride(displayIsDark ? false : true)
                    }
                    className="sidebar-ref__nav-item"
                    aria-label={
                      displayIsDark
                        ? "Switch preview to light mode"
                        : "Switch preview to dark mode"
                    }
                  >
                    <span className="sidebar-ref__nav-icon-wrap">
                      {displayIsDark ? <Sun size={22} /> : <Moon size={22} />}
                    </span>
                    <span className="sidebar-ref__nav-label">
                      {displayIsDark ? "Light mode" : "Dark mode"}
                    </span>
                  </button>
                </nav>

                <div className="sidebar-ref__bottom">
                  <button type="button" className="sidebar-ref__bottom-item">
                    <LogOut size={22} />
                    <span>Log out</span>
                  </button>
                </div>
              </aside>
            </div>

            {/* Combined block: content changes by nav; on mobile "all" = only list full width */}
            <div className={`app-content-wrap flex-1 flex min-w-0 main-screen-preview__content ${isMobile ? "app-card__main" : ""}`}>
              {activeNav === "all" && (
                <>
                  <div className={isMobile ? "chat-list-panel-wrap flex-1 w-full min-w-0" : "flex-shrink-0"}>
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
                        <button type="button" className="chat-list-panel__new-chat-btn">
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
                                src={chat.avatar || DEFAULT_AVATAR_URL}
                                alt={chat.name}
                                className="chat-list-panel__avatar"
                              />
                              {chat.online && <span className="chat-list-panel__online" aria-hidden />}
                            </div>
                            <div className="chat-list-panel__body">
                              <div className="chat-list-panel__row">
                                <span className="chat-list-panel__name">{chat.name}</span>
                                <span className="chat-list-panel__time">{chat.time}</span>
                              </div>
                              <p className="chat-list-panel__preview">{chat.preview}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {!isMobile && (
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="chat-layout" style={{ minHeight: 0 }}>
                      <div className="flex-1 flex flex-col min-h-0">
                        <header className="chat-header-ref main-screen-preview__chat-header">
                          <div className="chat-header-ref__left">
                            <div className="chat-list-panel__avatar-wrap">
                              <img src={MOCK_CHATS[0].avatar || DEFAULT_AVATAR_URL} alt="Johnny" className="chat-header-ref__avatar" />
                              <span className="chat-list-panel__online" aria-hidden />
                            </div>
                            <div className="chat-header-ref__info">
                              <h1 className="chat-header-ref__title">Johnny</h1>
                              <p className="chat-header-ref__subtitle">Online</p>
                            </div>
                          </div>
                          <div className="chat-header-ref__actions">
                            <button type="button" className="chat-header-ref__icon" aria-hidden><Search size={24} /></button>
                            <button type="button" className="chat-header-ref__icon" aria-hidden><Phone size={24} /></button>
                            <button type="button" className="chat-header-ref__icon" aria-hidden><Video size={24} /></button>
                            <button type="button" className="chat-header-ref__icon" aria-hidden><MoreVertical size={24} /></button>
                          </div>
                        </header>
                        <div className="chat-container-wrap">
                          <div className="chat-container chat-container-ref main-screen-preview__chat-body">
                            {MOCK_MESSAGES.map((msg) => (
                              <div key={msg.id} className={`msg-row ${msg.mine ? "msg-row--mine" : "msg-row--theirs"}`}>
                                <div className="msg-bubble-wrapper">
                                  <div className={`msg-bubble-ref ${msg.mine ? "msg-bubble-ref--mine" : "msg-bubble-ref--theirs"}`}>
                                    {msg.text}
                                  </div>
                                  {msg.seenLabel && <div className="main-screen-preview__msg-seen">{msg.seenLabel}</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="message-input-ref main-screen-preview__input">
                          <form className="message-input-ref__bar" onSubmit={(e) => e.preventDefault()}>
                            <button type="button" className="message-input-ref__attach" aria-hidden><Paperclip size={20} /></button>
                            <input type="text" readOnly className="message-input-ref__input" placeholder="Your message" />
                            <div className="message-input-ref__extra">
                              <button type="button" className="message-input-ref__attach" aria-hidden><Clock size={18} /></button>
                            </div>
                            <button type="button" className="message-input-ref__send" aria-label="Send"><Send size={20} /></button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                </>
              )}

              {activeNav === "friends" && (
                <div className="friends-panel main-screen-preview__friends">
                  <div className="friends-panel__tabs">
                    <button type="button" className="friends-panel__tab friends-panel__tab--active">List</button>
                    <button type="button" className="friends-panel__tab">Requests</button>
                  </div>
                  <div className="friends-panel__search">
                    <Search className="friends-panel__search-icon" size={18} />
                    <input type="text" placeholder="Search friends" readOnly className="friends-panel__search-input" />
                  </div>
                  <div className="friends-panel__sort">
                    <button type="button" className="friends-panel__sort-btn friends-panel__sort-btn--active">Date added</button>
                    <button type="button" className="friends-panel__sort-btn">A–Z</button>
                  </div>
                  <div className="friends-panel__grid">
                    {MOCK_FRIENDS.map((friend) => (
                      <div key={friend.id} className="friends-panel__card">
                        <div className="friends-panel__card-btn">
                          <div className="friends-panel__card-avatar-wrap">
                            <img src={friend.avatar || DEFAULT_AVATAR_URL} alt={friend.name} className="friends-panel__card-avatar" />
                          </div>
                          <span className="friends-panel__card-name">{friend.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeNav === "profile" && (
                <div className="profile-content-wrap flex-1 flex min-w-0 flex-col main-screen-preview__profile">
                  <div className="profile-content-wrap__spacer" aria-hidden />
                  <div className="profile-page-backdrop">
                    <div className="profile-page-backdrop__fill" aria-hidden />
                    <div className="profile-page-inner main-screen-preview__profile-inner">
                      <div className="profile-photo-panel">
                        <div className="profile-photo-wrap">
                          <img src={ANIMAL_AVATAR_URLS[2]} alt="Profile" className="profile-photo-img" />
                        </div>
                      </div>
                      <div className="profile-cards-panel">
                        <section className="profile-section-card">
                          <div className="profile-section-header">
                            <h2 className="profile-section-title">Personal Information</h2>
                            <button type="button" className="profile-edit-btn" aria-hidden>
                              <Pencil size={16} />
                              <span>Edit</span>
                            </button>
                          </div>
                          <div className="profile-fields-grid">
                            <div className="profile-field-item">
                              <label className="profile-field-label">FIRST NAME</label>
                              <div className="profile-field-value">Chintu</div>
                            </div>
                            <div className="profile-field-item">
                              <label className="profile-field-label">LAST NAME</label>
                              <div className="profile-field-value">Jiya</div>
                            </div>
                            <div className="profile-field-item">
                              <label className="profile-field-label">EMAIL ADDRESS</label>
                              <div className="profile-field-value profile-field-value--readonly">chintu@gmail.com</div>
                            </div>
                            <div className="profile-field-item">
                              <label className="profile-field-label">GENDER</label>
                              <div className="profile-field-value">Male</div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                  <div className="profile-content-wrap__spacer" aria-hidden />
                  <div className="profile-user-id">
                    <span className="profile-user-id__label">YOUR USER ID</span>
                    <div className="profile-user-id__row">
                      <code className="profile-user-id__code">2NTVM1</code>
                      <button type="button" className="profile-user-id__share" aria-hidden><Share2 size={20} /></button>
                      <button type="button" className="profile-user-id__copy" aria-hidden><Copy size={18} /></button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreenPreview;
