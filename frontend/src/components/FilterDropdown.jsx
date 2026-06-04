import React from 'react';

export default function FilterDropdown({ value, onChange }) {
  return (
    <select className="filter-select" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="all">All</option>
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
    </select>
  );
}
