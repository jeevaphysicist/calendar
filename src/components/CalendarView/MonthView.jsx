// MonthView.js
import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth
} from "date-fns";

const MonthView = ({ events, currentDate }) => {
  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);
  const startDate = startOfWeek(startOfCurrentMonth, { weekStartsOn: 0 });
  const endDate = endOfWeek(endOfCurrentMonth, { weekStartsOn: 0 });

  const monthDays = [];
  let day = startDate;
  while (day <= endDate) {
    monthDays.push(day);
    day = addDays(day, 1);
  }

  const getEventsForDay = (date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date));
  };

  return (
    <div className="grid grid-cols-7 gap-4">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
        <div key={index} className="text-center font-semibold">{day}</div>
      ))}

      {monthDays.map((day, index) => (
        <div
          key={index}
          className={`p-2 border rounded-lg ${
            isSameMonth(day, currentDate) ? "" : "bg-gray-100"
          }`}
        >
          <div className="text-right text-xs font-semibold">{format(day, "d")}</div>

          {getEventsForDay(day).map((event) => (
            <div key={event.id} className="mt-2 p-1 bg-blue-100 rounded">
              <p className="text-xs font-semibold">{event.title}</p>
              <p className="text-xs">{event.time}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MonthView;
