import React from "react";
import "./ui.css";

export default function Button({
  variant = "default",
  size = "md",
  children,
  icon: Icon,
  onClick,
  active = false,
  className = "",
  ...props
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${
        active ? "btn--active" : ""
      } ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon size={18} className="btn__icon" />}
      {children && <span className="btn__label">{children}</span>}
    </button>
  );
}
