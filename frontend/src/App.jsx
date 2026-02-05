import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ThemeSync from "./components/ThemeSync";
import CallListener from "./components/CallListener";
import CallControls from "./components/CallControls";
import { socket } from "./lib/socket"; // ✅ REQUIRED
import CallingUI from "./components/CallingUI";
import { useChatStore } from "./store/useChatStore";
import VideoCallUI from "./components/VideoCallUI";
import { useAudioCall } from "./store/useAudioCall";

const App = () => {
  const { endCall } = useAudioCall();
  const [callType, setCallType] = useState(null);
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const [calling, setCalling] = useState(false);
  const [activeCallUserAvatar, setActiveCallUserAvatar] = useState("");
  const [activeCallUserName, setActiveCallUserName] = useState("");
  const [incoming, setIncoming] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [activeCallUserId, setActiveCallUserId] = useState(null);

  const cancelCall = () => {
    console.log("🔕 Caller cancelled call");

    if (activeCallUserId) {
      socket.emit("end-call", { to: activeCallUserId });
    }

    setCalling(false);
    setCallActive(false);
    setActiveCallUserId(null);
    setActiveCallUserName("");
    setActiveCallUserAvatar("");
  };

  // ✅ Check auth on app load
  useEffect(() => {
    console.log("CALL UI STATE", {
      callActive,
      activeCallUserId,
      activeCallUserName,
      activeCallUserAvatar,
    });
  }, [callActive]);

  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ SINGLE SOURCE OF TRUTH FOR ENDING CALL UI
  useEffect(() => {
    const onCallEnded = () => {
      console.log("📴 call-ended → hiding controls");
      setCallActive(false);
      setCalling(false);
      setActiveCallUserId(null);
    };

    socket.on("call-ended", onCallEnded);
    return () => socket.off("call-ended", onCallEnded);
  }, []);

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("❌ SOCKET DISCONNECTED");
    });
    socket.on("disconnect", (reason) => {
      console.error("❌ SOCKET DISCONNECTED:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ SOCKET CONNECT ERROR:", err.message);
    });

    socket.on("error", (err) => {
      console.error("❌ SOCKET ERROR:", err);
    });
  }, []);

  // ✅ Caller-side activation (after answer)
  useEffect(() => {
    const handler = () => {
      setCalling(false);
      setCallActive(true);
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
      <Navbar />
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
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
