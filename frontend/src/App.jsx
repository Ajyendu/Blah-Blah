import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import FriendsPage from "./pages/FriendsPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useState, useRef } from "react";
import { flushSync } from "react-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ThemeSync from "./components/ThemeSync";
import CallListener from "./components/CallListener";
import CallControls from "./components/CallControls";
import { useThemeStore } from "./store/useThemeStore";
import CallingUI from "./components/CallingUI";
import { useChatStore } from "./store/useChatStore";
import VideoCallUI from "./components/VideoCallUI";
import { useAudioCall } from "./store/useAudioCall";

const App = () => {
  const { endCall } = useAudioCall();
  const socket = useAuthStore((s) => s.socket);
  const [callType, setCallType] = useState(null);
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const getMyChats = useChatStore((s) => s.getMyChats);
  const [calling, setCalling] = useState(false);
  const [activeCallUserAvatar, setActiveCallUserAvatar] = useState("");
  const [activeCallUserName, setActiveCallUserName] = useState("");
  const [incoming, setIncoming] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [activeCallUserId, setActiveCallUserId] = useState(null);

  const cancelCall = () => {
    if (activeCallUserId) {
      socket.emit("end-call", { to: String(activeCallUserId) });
    }
    setCalling(false);
    setCallActive(false);
    setActiveCallUserId(null);
    setActiveCallUserName("");
    setActiveCallUserAvatar("");
    setCallType(null);
  };

  // ✅ Check auth on app load
  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ Load all conversations (with last messages) as soon as user is authenticated and page is opened
  useEffect(() => {
    if (authUser?._id) getMyChats();
  }, [authUser?._id, getMyChats]);

  const clearCallUIRef = useRef(null);
  clearCallUIRef.current = () => {
    setCallActive(false);
    setCalling(false);
    setActiveCallUserId(null);
    setActiveCallUserName("");
    setActiveCallUserAvatar("");
    setCallType(null);
  };

  useEffect(() => {
    if (!socket) return;
    const onCallEnded = () => {
      flushSync(() => {
        if (clearCallUIRef.current) clearCallUIRef.current();
      });
    };
    socket.on("call-ended", onCallEnded);
    window.addEventListener("call-ended-local", onCallEnded);

    return () => {
      socket.off("call-ended", onCallEnded);
      window.removeEventListener("call-ended-local", onCallEnded);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("disconnect", () => {});
    socket.on("connect_error", (err) => {
      console.error("❌ SOCKET CONNECT ERROR:", err.message);
    });
    socket.on("error", (err) => {
      console.error("❌ SOCKET ERROR:", err);
    });
  }, []);

  // ✅ Caller-side activation (after answer)
  useEffect(() => {
    const handler = (e) => {
      setCalling(false);
      setCallActive(true);
      if (e.detail?.callType) setCallType(e.detail.callType);
    };

    window.addEventListener("call-accepted", handler);
    return () => window.removeEventListener("call-accepted", handler);
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      <ThemeSync />

      <CallListener
        setActiveCallUserId={setActiveCallUserId}
        setActiveCallUserName={setActiveCallUserName}
        setActiveCallUserAvatar={setActiveCallUserAvatar}
        setCallActive={setCallActive}
        setCallType={setCallType}
      />

      {callActive && !calling && callType === "audio" && (
        <CallControls
          activeCallUserId={activeCallUserId}
          avatar={activeCallUserAvatar} // 🔥 RECEIVER DP
          name={activeCallUserName}
          callActive={callActive}
        />
      )}

      {callActive && callType === "video" && (
        <VideoCallUI
          activeCallUserId={activeCallUserId}
          activeCallUserName={activeCallUserName}
          activeCallUserAvatar={activeCallUserAvatar}
          callActive={callActive}
        />
      )}

      {calling && !callActive && (
        <CallingUI
          name={activeCallUserName}
          avatar={activeCallUserAvatar}
          onCancel={cancelCall}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <HomePage
                setCallType={setCallType}
                setCallActive={setCallActive}
                setCalling={setCalling}
                setActiveCallUserId={setActiveCallUserId}
                setActiveCallUserName={setActiveCallUserName}
                setActiveCallUserAvatar={setActiveCallUserAvatar}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/friends"
          element={
            authUser ? (
              <FriendsPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
