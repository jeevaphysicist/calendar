// WeekView.js
import React from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";

const WeekView = ({ events, currentDate }) => {
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfCurrentWeek, index)
  );

  const getEventsForDay = (date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date));
  };

  return (
    <div className="grid grid-cols-7 gap-4">
      {weekDays.map((day) => (
        <div key={day} className="p-4 border rounded-lg">
          <h3 className="font-semibold text-center">{format(day, "EEE, MMM d")}</h3>
          {getEventsForDay(day).map((event) => (
            <div key={event.id} className="p-2 mt-2 bg-blue-100 rounded-md">
              <p className="text-sm font-semibold">{event.title}</p>
              <p className="text-xs">{event.time}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WeekView;
