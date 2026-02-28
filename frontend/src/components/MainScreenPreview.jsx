/**
 * Main screen preview: exact copy of the app layout (sidebar + chat list + main area).
 * Theme passed as CSS vars on wrapper. Nav buttons switch between All chats, Friends, Profile, Edit previews.
 */
import { useState } from "react";
import {
  MessageCircle,
  Users,
  User,
  Settings,
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
import { DEFAULT_AVATAR_URL, DEFAULT_AVATARS_BOY, DEFAULT_AVATARS_GIRL } from "../lib/defaultAvatar.js";
import "./Sidebar.css";
import "./ChatListPanel.css";
import "./ChatHeader.css";
import "./ChatContainer.css";
import "./MessageInput.css";
import "./FriendsPanel.css";
import "../pages/ProfilePage.css";
import "../pages/Homepage.css";
import "./MainScreenPreview.css";

const NAV_ITEMS = [
  { id: "all", label: "All chats", Icon: MessageCircle, badge: true },
  { id: "friends", label: "Friends", Icon: Users, badge: false },
  { id: "profile", label: "Profile", Icon: User, badge: false },
  { id: "edit", label: "Edit", Icon: Settings, badge: false },
];

const MOCK_CHATS = [
  { id: "1", name: "Johnny", time: "1m", preview: "Hey", selected: true, online: true, avatar: DEFAULT_AVATARS_BOY[0] },
  { id: "2", name: "Sam", time: "1h", preview: "See you later", selected: false, online: false, avatar: DEFAULT_AVATARS_GIRL[0] },
];

const MOCK_MESSAGES = [
  { id: "m1", text: "Hi", mine: false },
  { id: "m2", text: "Hey", mine: true, seenLabel: "Seen at 19:58 today" },
];

const SETTINGS_COLOR_ITEMS = [
  { key: "accent", label: "Accent" },
  { key: "appBg", label: "App bg" },
  { key: "panelBg", label: "Panel (header, input)" },
  { key: "darkBg", label: "Sidebar" },
  { key: "bubbleMine", label: "My bubble" },
  { key: "bubbleOther", label: "Other bubble" },
  { key: "textPrimary", label: "Text" },
  { key: "textSecondary", label: "Text secondary" },
];

const MainScreenPreview = ({ theme }) => {
  const [activeNav, setActiveNav] = useState("all");

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
    "--panel-bg": theme.panelBg ?? "#ffffff",
    "--page-bg": theme.pageBg,
  };

  return (
    <div className="main-screen-preview" style={vars}>
      <div className="main-screen-preview__scale main-screen-preview__scale--interactive">
        <div className="app-shell h-screen w-screen flex main-screen-preview__shell">
          <div className="flex flex-1 m-6 overflow-hidden app-card main-screen-preview__card">
            {/* SIDEBAR - clickable nav */}
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
                      onClick={() => setActiveNav(id)}
                      className={`sidebar-ref__nav-item ${activeNav === id ? "active" : ""}`}
                    >
                      <span className="sidebar-ref__nav-icon-wrap">
                        <Icon size={22} />
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

            {/* Combined block: content changes by nav */}
            <div className="app-content-wrap flex-1 flex min-w-0 main-screen-preview__content">
              {activeNav === "all" && (
                <>
                  <div className="flex-shrink-0">
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
                </>
              )}

              {activeNav === "friends" && (
                <div className="friends-panel main-screen-preview__friends">
                  <h1 className="friends-panel__title">Friends</h1>
                  <div className="friends-panel__search">
                    <Search className="friends-panel__search-icon" size={18} />
                    <input type="text" placeholder="Search friends" readOnly className="friends-panel__search-input" />
                  </div>
                  <div className="friends-panel__sort">
                    <button type="button" className="friends-panel__sort-btn friends-panel__sort-btn--active">
                      <Calendar size={16} />
                      <span>Date added</span>
                    </button>
                    <button type="button" className="friends-panel__sort-btn">
                      <ArrowDownAZ size={16} />
                      <span>A–Z</span>
                    </button>
                  </div>
                  <div className="friends-panel__list">
                    <div className="friends-panel__item-wrap">
                      <button type="button" className="friends-panel__item">
                        <div className="friends-panel__avatar-wrap">
                          <img src={DEFAULT_AVATARS_BOY[0]} alt="Johnny" className="friends-panel__avatar" />
                          <span className="friends-panel__online" />
                        </div>
                        <div className="friends-panel__body">
                          <span className="friends-panel__name">Johnny</span>
                        </div>
                      </button>
                      <button type="button" className="friends-panel__remove" aria-hidden><UserMinus size={14} strokeWidth={2.25} /><span>Remove</span></button>
                    </div>
                    <div className="friends-panel__item-wrap">
                      <button type="button" className="friends-panel__item">
                        <div className="friends-panel__avatar-wrap">
                          <img src={DEFAULT_AVATARS_GIRL[0]} alt="Sam" className="friends-panel__avatar" />
                        </div>
                        <div className="friends-panel__body">
                          <span className="friends-panel__name">Sam</span>
                        </div>
                      </button>
                      <button type="button" className="friends-panel__remove" aria-hidden><UserMinus size={14} strokeWidth={2.25} /><span>Remove</span></button>
                    </div>
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
                          <img src={DEFAULT_AVATARS_BOY[0]} alt="Profile" className="profile-photo-img" />
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
                              <label className="profile-field-label">First Name</label>
                              <div className="profile-field-value">Chintu</div>
                            </div>
                            <div className="profile-field-item">
                              <label className="profile-field-label">Last Name</label>
                              <div className="profile-field-value">Jiya</div>
                            </div>
                            <div className="profile-field-item">
                              <label className="profile-field-label">Email Address</label>
                              <div className="profile-field-value profile-field-value--readonly">chintu@gmail.com</div>
                            </div>
                            <div className="profile-field-item">
                              <label className="profile-field-label">Gender</label>
                              <div className="profile-field-value">Male</div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                  <div className="profile-content-wrap__spacer" aria-hidden />
                  <div className="profile-user-id">
                    <span className="profile-user-id__label">Your User ID</span>
                    <div className="profile-user-id__row">
                      <code className="profile-user-id__code">2NTVM1</code>
                      <button type="button" className="profile-user-id__share" aria-hidden><Share2 size={20} /></button>
                      <button type="button" className="profile-user-id__copy" aria-hidden><Copy size={18} /></button>
                    </div>
                  </div>
                </div>
              )}

              {activeNav === "edit" && (
                <div className="main-screen-preview__settings">
                  <div className="main-screen-preview__settings-actions">
                    <button type="button" className="main-screen-preview__settings-btn main-screen-preview__settings-btn--reset" disabled>Reset to default</button>
                    <button type="button" className="main-screen-preview__settings-btn main-screen-preview__settings-btn--cancel" disabled>Cancel</button>
                    <button type="button" className="main-screen-preview__settings-btn main-screen-preview__settings-btn--save" disabled>Save changes</button>
                  </div>
                  <div className="main-screen-preview__settings-colors">
                    {SETTINGS_COLOR_ITEMS.map(({ key, label }) => {
                      const value = key === "darkBg" ? (theme.darkBg != null ? theme.darkBg : "#000000") : key === "panelBg" ? (theme.panelBg ?? "#ffffff") : (theme[key] ?? "");
                      return (
                        <div key={key} className="main-screen-preview__settings-color-card">
                          <span className="main-screen-preview__settings-swatch" style={{ background: value }} />
                          <span className="main-screen-preview__settings-color-label">{label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="main-screen-preview__settings-danger">
                    <h3 className="main-screen-preview__settings-danger-title">Delete account</h3>
                    <p className="main-screen-preview__settings-danger-desc">Permanently delete your account and data. This cannot be undone.</p>
                    <button type="button" className="main-screen-preview__settings-delete-btn" disabled>Delete my account</button>
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
