// DayView.js
import React from "react";
import { format, isSameDay } from "date-fns";

const DayView = ({ events, currentDate }) => {
  const eventsForDay = events.filter((event) =>
    isSameDay(new Date(event.date), currentDate)
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{format(currentDate, "EEEE, MMMM d, yyyy")}</h2>
      {eventsForDay.length > 0 ? (
        eventsForDay.map((event) => (
          <div key={event.id} className="p-2 mt-2 bg-blue-100 rounded-md">
            <p className="font-semibold">{event.title}</p>
            <p>{event.time}</p>
          </div>
        ))
      ) : (
        <p>No events for today.</p>
      )}
    </div>
  );
};

export default DayView;
