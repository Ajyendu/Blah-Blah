import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { flushSync } from "react-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ThemeSync from "./components/ThemeSync";
import CallListener from "./components/CallListener";
import CallControls from "./components/CallControls";
import CallingUI from "./components/CallingUI";
import { useChatStore } from "./store/useChatStore";
import VideoCallUI from "./components/VideoCallUI";
import { useAudioCall } from "./store/useAudioCall";
import { useNoteStore } from "./store/useNoteStore";
import { useGameStore } from "./store/useGameStore";
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const FriendsPage = lazy(() => import("./pages/FriendsPage"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader className="size-10 animate-spin text-pink-500" />
    </div>
  );
}

const App = () => {
  const location = useLocation();
  const { startCall, answerCall, endCall, isMuted, toggleMute } = useAudioCall();
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

  // ✅ Open video panel with URL when landing with ?youtube= (e.g. from bookmarklet)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const youtubeUrlParam = params.get("youtube");
    if (youtubeUrlParam) {
      const url = decodeURIComponent(youtubeUrlParam);
      const noteStore = useNoteStore.getState();
      noteStore.setPendingYoutubeUrl(url);
      noteStore.setIsNotesOpen(false);
      noteStore.setIsDrawingOpen(false);
      noteStore.setIsVideoPanelOpen(true);
      useGameStore.getState().setTruthDareOpen(false);
      window.history.replaceState(null, "", window.location.pathname + (window.location.hash || ""));
    }
  }, [location.search]);

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
      <ThemeSync />

      <CallListener
        setActiveCallUserId={setActiveCallUserId}
        setActiveCallUserName={setActiveCallUserName}
        setActiveCallUserAvatar={setActiveCallUserAvatar}
        setCallActive={setCallActive}
        setCallType={setCallType}
        answerCall={answerCall}
      />

      {callActive && !calling && callType === "audio" && (
        <CallControls
          activeCallUserId={activeCallUserId}
          avatar={activeCallUserAvatar} // 🔥 RECEIVER DP
          name={activeCallUserName}
          callActive={callActive}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onEndCall={endCall}
        />
      )}

      {callActive && callType === "video" && (
        <VideoCallUI
          activeCallUserId={activeCallUserId}
          activeCallUserName={activeCallUserName}
          activeCallUserAvatar={activeCallUserAvatar}
          callActive={callActive}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onEndCall={endCall}
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
                startCall={startCall}
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
        <Route
          path="/settings"
          element={
            authUser ? <Navigate to="/" replace /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={
            authUser ? (
              <Suspense fallback={<PageLoader />}>
                <ProfilePage />
              </Suspense>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/friends"
          element={
            authUser ? (
              <Suspense fallback={<PageLoader />}>
                <FriendsPage
                  setCallType={setCallType}
                  setCalling={setCalling}
                  setActiveCallUserId={setActiveCallUserId}
                  setActiveCallUserName={setActiveCallUserName}
                  setActiveCallUserAvatar={setActiveCallUserAvatar}
                  startCall={startCall}
                />
              </Suspense>
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
