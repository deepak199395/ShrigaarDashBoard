import React, { useEffect, useState } from "react";
import "../Style/Analytics.css";

const Analytics = () => {
  const [sessions, setSessions] = useState([]);

  // 🔥 FETCH DATA
  const fetchAnalytics = async () => {
    try {
      const res = await fetch(
        "https://www.shrigaar.com/api/v1/shringar/Screens/journey/api69"
      );
      const data = await res.json();

      if (data.success) {
        setSessions(data.sessions);
      }
    } catch (error) {
      console.error("Analytics error:", error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // ⏱ FORMAT TIME
  const formatTime = (ms) => {
    if (!ms) return "0 sec";
    if (ms < 1000) return `${ms} ms`;
    return `${(ms / 1000).toFixed(2)} sec`;
  };

  return (
    <div className="analytics-container">
      <h1>📊 Analytics Dashboard</h1>

      {sessions.map((session, i) => (
        <div key={i} className="session-card">
          <div className="session-header">
            <p><b>Session:</b> {session._id}</p>
            <p><b>User:</b> {session.email || "Guest"}</p>
          </div>

          {/* 🧭 SCREEN JOURNEY */}
          <div className="timeline">
            {session.screens.map((step, index) => (
              <div key={index} className="timeline-item">

                <div className="circle"></div>

                <div className="content">
                  <h4>{step.screen}</h4>
                  <p>⏱ {formatTime(step.duration)}</p>
                  <small>
                    {new Date(step.startTime).toLocaleString()}
                  </small>
                </div>

              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Analytics;