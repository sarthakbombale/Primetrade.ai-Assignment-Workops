import { useState } from "react";
import "../styles/FilterDropdown.css";
export default function FilterDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const options = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ];

  const selected = options.find((o) => o.value === value);

  return (
    <div className="custom-dropdown">
      <button
        className="dropdown-btn"
        onClick={() => setOpen(!open)}
        type="button"
      >
        {selected.label}
        <span>▾</span>
      </button>

      {open && (
        <div className="dropdown-menu">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`dropdown-item ${
                value === opt.value ? "active" : ""
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}