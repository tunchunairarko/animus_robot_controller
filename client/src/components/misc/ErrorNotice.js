import React from "react";
import "../assets/style.css";


export default function ErrorNotice(props) {
  return (
    <div className="error-notice">
      <span className="error-close-message">{props.message}</span>
      <button className="error-close-button" onClick={props.clearError}>X</button>
    </div>
  );
}