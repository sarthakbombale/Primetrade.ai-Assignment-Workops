import React from 'react';

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pagination-container">
      <button className="pagination-button" onClick={onPrev} disabled={page <= 1}>
        Prev
      </button>

      <div className="pagination-info">Page {page} of {totalPages}</div>

      <button className="pagination-button" onClick={onNext} disabled={page >= totalPages}>
        Next
      </button>
    </div>
  );
}
