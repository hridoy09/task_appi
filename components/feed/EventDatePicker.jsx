"use client";

import React, { useEffect, useRef, useState } from "react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateString(value) {
  if (!value) return null;

  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

const EventDatePicker = ({ value, onChange }) => {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedDate = parseDateString(value);
  const [viewDate, setViewDate] = useState(selectedDate || new Date());

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);

  function goToPrevMonth() {
    setViewDate(new Date(year, month - 1, 1));
  }

  function goToNextMonth() {
    setViewDate(new Date(year, month + 1, 1));
  }

  function selectDay(day) {
    onChange(toDateString(new Date(year, month, day)));
    setIsOpen(false);
  }

  const monthLabel = viewDate.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="position-relative" ref={containerRef}>
      <button
        type="button"
        className="btn btn-light btn-sm d-flex align-items-center gap-2 rounded border text-secondary"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{value || "Select event date"}</span>
      </button>

      {isOpen ? (
        <div
          className="position-absolute bg-white border rounded shadow-sm p-2"
          style={{ top: "calc(100% + 6px)", left: 0, zIndex: 20, width: 240 }}
        >
          <div className="d-flex align-items-center justify-content-between mb-2">
            <button
              type="button"
              className="btn btn-sm btn-light"
              onClick={goToPrevMonth}
              aria-label="Previous month"
            >
              &lsaquo;
            </button>
            <span className="fw-medium small">{monthLabel}</span>
            <button
              type="button"
              className="btn btn-sm btn-light"
              onClick={goToNextMonth}
              aria-label="Next month"
            >
              &rsaquo;
            </button>
          </div>

          <div
            className="d-grid"
            style={{ gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}
          >
            {WEEKDAYS.map((label) => (
              <div key={label} className="text-center small text-muted">
                {label}
              </div>
            ))}

            {cells.map((day, index) => {
              if (!day) return <div key={`blank-${index}`} />;

              const isSelected =
                selectedDate &&
                selectedDate.getFullYear() === year &&
                selectedDate.getMonth() === month &&
                selectedDate.getDate() === day;

              return (
                <button
                  key={day}
                  type="button"
                  className={`btn btn-sm rounded-circle p-0 ${isSelected ? "btn-primary" : "btn-light"}`}
                  style={{ width: 28, height: 28 }}
                  onClick={() => selectDay(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventDatePicker;
