import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../lib/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import "./ChatDNA.css";

export default function ChatDNA({ chatId }) {
  const [data, setData] = useState(null);
  const [hourFilter, setHourFilter] = useState("all");

  useEffect(() => {
    if (!chatId) return;
    axiosInstance
      .get(`/chat-dna/${chatId}`)
      .then((res) => setData(res.data))
      .catch(console.error);
  }, [chatId]);

  if (!data) return <div className="dna-loading">Analyzing Chat DNA...</div>;

  // ===== SAFE DATA =====
  const energy = Math.round((data.conversationEnergy || 0) * 100);
  const relationship = data.relationshipStrength || 50;

  const mainCharacter = Object.entries(data.mainCharacterIndex || {}).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const donutData = Object.entries(data.participation || {}).map(
    ([name, value]) => ({ name, value })
  );

  const emotionTimeline = Object.entries(data.emotionTimeline || {}).map(
    ([date, emo]) => ({
      date,
      ...emo,
    })
  );

  const safeHourly = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    count: data.hourlyActivity?.[hourFilter]?.[hour] || 0,
  }));
  const type = data.conversationType || "Balanced";

  const typeColor =
    type === "High Energy"
      ? "#ff1744" // neon red
      : type === "One-sided"
      ? "#3b82f6" // blue
      : "#22c55e"; // green

  return (
    <div className="dna-fullscreen-container">
      {/* ===== HERO SECTION ===== */}
      <div className="dna-hero-pro">
        {/* Relationship Ring */}
        <div
          className="dna-ring"
          style={{
            background: `conic-gradient(#22c55e ${
              relationship * 3.6
            }deg, #111827 0deg)`,
          }}
        >
          <div className="dna-ring-inner">
            <h2>{relationship}</h2>
            <span>Relationship</span>
          </div>
        </div>

        {/* Energy Meter */}
        <div className="dna-energy-card">
          <h3>⚡ Conversation Energy</h3>
          <div className="dna-energy-bar">
            <div className="dna-energy-fill" style={{ width: `${energy}%` }} />
          </div>
          <span>{energy}%</span>
        </div>
      </div>

      {/* ===== MAIN GRID ===== */}
      <div className="dna-dashboard-grid">
        {/* 👑 Main Character */}
        {/* 🎭 Conversation Type */}
        <div className="dna-card dna-type-card">
          <div
            className="dna-conversation-type"
            style={{
              color: typeColor,
              textShadow: `0 0 12px ${typeColor}`,
            }}
          >
            {type}
          </div>

          <p className="dna-type-desc">
            {data.conversationType === "High Energy"
              ? "Fast replies, active engagement, high interaction."
              : data.conversationType === "One-sided"
              ? "One person leads most of the conversation."
              : "Balanced participation and steady flow."}
          </p>
        </div>
        {/* Participation */}
        <div className="dna-card">
          <h4>Participation</h4>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={donutData}
                dataKey="value"
                innerRadius={40}
                outerRadius={70}
              >
                {donutData.map((_, i) => (
                  <Cell key={i} fill={`hsl(${i * 140},70%,60%)`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Hour Heat Strip */}
        <div className="dna-card dna-hourly-card dna-hourly-wide">
          <div className="dna-card-header">
            <h4>Hourly Activity</h4>
            <div className="dna-tabs">
              {["today", "week", "year", "all"].map((tab) => (
                <span
                  key={tab}
                  className={hourFilter === tab ? "active-tab" : ""}
                  onClick={() => setHourFilter(tab)}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          <div className="dna-heat-strip">
            {safeHourly.map((item) => {
              const max = Math.max(...safeHourly.map((h) => h.count));
              const intensity = max === 0 ? 0 : item.count / max;
              const isNight = item.hour < 6 || item.hour >= 21;

              return (
                <div
                  key={item.hour}
                  title={`Hour ${item.hour}: ${item.count} messages`}
                  className="dna-heat-cell"
                  style={{
                    background: `rgba(255,255,255, ${0.15 + intensity * 0.85})`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
