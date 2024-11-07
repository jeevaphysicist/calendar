import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"

const initialEvents = [
  { title: 'Meeting', start: new Date(), end: new Date(new Date().getTime() + 60*60*1000) }
]

const Calendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    startTime: "", 
    endDate: "",
    endTime: ""
  });

  const handleDateSelect = (selectInfo) => {
    const startDate = new Date(selectInfo.startStr);
    const endDate = new Date(selectInfo.endStr);
    
    setSelectedEvent({
      title: '',
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    });
    setFormData({
      title: "",
      startDate: startDate.toISOString().split('T')[0],
      startTime: startDate.toTimeString().slice(0,5),
      endDate: endDate.toISOString().split('T')[0],
      endTime: endDate.toTimeString().slice(0,5)
    });
    setSelectedDate(startDate.toISOString());
    setIsModalOpen(true);
  }

  const handleEventClick = (clickInfo) => {
    const eventDate = new Date(clickInfo.event.startStr);
    const endDate = clickInfo.event.end || new Date(eventDate.getTime() + 60*60*1000);
    setSelectedEvent({
      title: clickInfo.event.title,
      start: eventDate.toISOString(),
      end: endDate.toISOString(),
      id: clickInfo.event.id || clickInfo.event.title,
    });
    setFormData({
      title: clickInfo.event.title,
      startDate: eventDate.toISOString().split('T')[0],
      startTime: eventDate.toTimeString().slice(0,5),
      endDate: endDate.toISOString().split('T')[0],
      endTime: endDate.toTimeString().slice(0,5)
    });
    setIsModalOpen(true);
  }

  const handleEventDrop = (eventDropInfo) => {
    const updatedEvents = events.map(event => {
      if (event.title === eventDropInfo.event.title) {
        return {
          ...event,
          start: eventDropInfo.event.startStr,
          end: eventDropInfo.event.endStr,
        }
      }
      return event;
    });
    setEvents(updatedEvents);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEvent = () => {
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

    if (selectedEvent?.id) {
      const updatedEvents = events.map(event => {
        if (event.title === selectedEvent.id) {
          return {
            ...event,
            title: formData.title,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString()
          }
        }
        return event;
      });
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        title: formData.title,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString()
      }
      setEvents([...events, newEvent]);
    }
    setSelectedEvent(null);
    setFormData({
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: ""
    });
    setIsModalOpen(false);
  }

  return (
    <div className="w-full">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          weekends={true}
          events={events}
          eventContent={renderEventContent}
          editable={true}
          selectable={true}
          select={handleDateSelect}
          eventDrop={handleEventDrop}
          eventClick={handleEventClick}
          height="100vh"
          aspectRatio={1.5}         
          dayHeaderFormat={{ weekday: 'long' }}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }}
        
          buttonText={{
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day'
          }}
          dayMaxEvents={3}
          nowIndicator={true}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '09:00',
            endTime: '17:00',
          }}
        />
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedEvent?.id ? 'Edit Event' : 'Add Event'}</h2>
            <input
              className="border border-gray-300 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Start</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                  <input
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End</label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                  <input
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <button 
                onClick={handleSaveEvent}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {selectedEvent?.id ? 'Update' : 'Save'}
              </button>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedEvent(null);
                  setFormData({
                    title: "",
                    startDate: "",
                    startTime: "",
                    endDate: "",
                    endTime: ""
                  });
                }}
                className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

function renderEventContent(eventInfo) {
  return (
    <div className="  ">
      <div className="font-medium text-sm truncate">{eventInfo.timeText}</div>
      <div className="font-bold truncate">{eventInfo.event.title}</div>
    </div>
  )
}
