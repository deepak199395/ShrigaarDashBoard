import React from "react";
import "./ComingSoon.css";

const ComingSoon = ({ title = "Coming Soon", message }) => {
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-card">
        <div className="loader"></div>

        <h2>{title}</h2>
        <p>
          {message ||
            "This feature is under development. Please check back later."}
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
