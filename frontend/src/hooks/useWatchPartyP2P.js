import { useEffect, useRef, useCallback, useState } from "react";

const SOCKET_EVENT = "watch_party_webrtc_signal";

/**
 * Establishes a WebRTC data channel with the other Watch Party user for lowest-latency sync.
 * Falls back to socket when P2P is not ready.
 */
export function useWatchPartyP2P(chatIdStr, myUserId, otherParticipant, socket, onSyncMessage) {
  const [p2pReady, setP2pReady] = useState(false);
  const pcRef = useRef(null);
  const dcRef = useRef(null);
  const onSyncRef = useRef(onSyncMessage);
  onSyncRef.current = onSyncMessage;

  const sendSync = useCallback(
    (event, currentTime, isPaused) => {
      const payload = { event, currentTime, isPaused };
      const dc = dcRef.current;
      if (dc && dc.readyState === "open") {
        try {
          dc.send(JSON.stringify(payload));
        } catch (_) {}
        return;
      }
      if (socket && chatIdStr && otherParticipant) {
        socket.emit("watch_party_sync", {
          chatId: chatIdStr,
          otherUserId: String(otherParticipant._id ?? otherParticipant),
          ...payload,
        });
      }
    },
    [chatIdStr, otherParticipant, socket],
  );

  useEffect(() => {
    if (!chatIdStr || !otherParticipant || !socket) return;

    const other = String(otherParticipant._id ?? otherParticipant);
    const my = myUserId != null ? String(myUserId) : "";
    const iAmInitiator = my < other;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    pcRef.current = pc;

    let dc;
    if (iAmInitiator) {
      dc = pc.createDataChannel("watchparty", { ordered: true });
      dcRef.current = dc;
    } else {
      pc.ondatachannel = (e) => {
        dcRef.current = e.channel;
        e.channel.onmessage = (ev) => {
          try {
            const payload = JSON.parse(ev.data);
            onSyncRef.current?.(payload);
          } catch (_) {}
        };
        e.channel.onopen = () => setP2pReady(true);
      };
    }

    if (dc) {
      dc.onmessage = (ev) => {
        try {
          const payload = JSON.parse(ev.data);
          onSyncRef.current?.(payload);
        } catch (_) {}
      };
      dc.onopen = () => setP2pReady(true);
    }

    pc.onicecandidate = (e) => {
      if (!e.candidate) return;
      socket.emit(SOCKET_EVENT, {
        chatId: chatIdStr,
        otherUserId: other,
        type: "ice",
        payload: e.candidate,
      });
    };

    const handleSignal = ({ userId, type, payload: signalPayload }) => {
      if (String(userId) !== other) return;
      if (type === "offer") {
        pc.setRemoteDescription(new RTCSessionDescription(signalPayload))
          .then(() => pc.createAnswer())
          .then((answer) => pc.setLocalDescription(answer))
          .then(() => {
            socket.emit(SOCKET_EVENT, {
              chatId: chatIdStr,
              otherUserId: other,
              type: "answer",
              payload: pc.localDescription,
            });
          })
          .catch(() => {});
      } else if (type === "answer") {
        pc.setRemoteDescription(new RTCSessionDescription(signalPayload)).catch(() => {});
      } else if (type === "ice" && signalPayload) {
        pc.addIceCandidate(new RTCIceCandidate(signalPayload)).catch(() => {});
      }
    };

    socket.on(SOCKET_EVENT, handleSignal);

    if (iAmInitiator) {
      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .then(() => {
          socket.emit(SOCKET_EVENT, {
            chatId: chatIdStr,
            otherUserId: other,
            type: "offer",
            payload: pc.localDescription,
          });
        })
        .catch(() => {});
    }

    return () => {
      socket.off(SOCKET_EVENT, handleSignal);
      setP2pReady(false);
      dcRef.current = null;
      if (dc) dc.close();
      pc.close();
      pcRef.current = null;
    };
  }, [chatIdStr, myUserId, otherParticipant?._id, socket]);

  return { sendSync, p2pReady };
}
