import { useState, useEffect } from "react";
import { Users, Plus } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import NewChatModal from "./NewChatModal";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import React from "react";

const Sidebar = () => {
  const { chats, getMyChats, selectedChat, setSelectedChat, isChatsLoading } =
    useChatStore();

  const [showNewChat, setShowNewChat] = useState(false);

  const { onlineUsers, authUser } = useAuthStore();

  useEffect(() => {
    getMyChats();
  }, [getMyChats]);

  if (isChatsLoading) return <SidebarSkeleton />;

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200"
      style={{ backgroundColor: "#FCFCFD", border: "none" }}
    >
      <button
        onClick={() => setShowNewChat(true)}
        className="btn btn-sm btn-outline w-full flex items-center gap-2 mb-3"
      >
        <Plus size={16} />
        New Chat
      </button>
      {showNewChat && (
        <NewChatModal
          isOpen={showNewChat}
          onClose={() => setShowNewChat(false)}
        />
      )}

      {/* Header */}
      <div className="border-b p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Chats</span>
        </div>
      </div>

      {/* Conversations */}
      <div className="overflow-y-auto w-full py-3">
        {Array.isArray(chats) &&
          chats.map((chat) => {
            const otherUser = chat.participants.find(
              (u) => u._id !== authUser._id
            );

            const isPending =
              !chat.acceptedBy && chat.createdBy !== authUser._id;

            return (
              <button
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedChat?._id === chat._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <img
                    src={otherUser.profilePic || "/avatar.png"}
                    alt={otherUser.name}
                    className="size-12 object-cover rounded-full"
                  />
                  {onlineUsers.includes(otherUser._id) && (
                    <span
                      className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                    />
                  )}
                </div>

                {/* User info - only visible on larger screens */}

                <div className="hidden lg:block text-left">
                  <div className="font-medium">{otherUser.fullName}</div>

                  {isPending ? (
                    <span className="text-xs text-orange-500">
                      Pending request
                    </span>
                  ) : onlineUsers.includes(otherUser._id) ? (
                    <span className="text-xs text-green-500">Online</span>
                  ) : (
                    <span className="text-xs text-zinc-400">Offline</span>
                  )}
                </div>
              </button>
            );
          })}

        {chats.length === 0 && (
          <div
            className="text-center text-zinc-500 py-4"
            style={{ color: "black" }}
          >
            {" "}
            No Conversations
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
