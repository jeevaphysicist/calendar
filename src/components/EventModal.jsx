import React, { useState, useEffect } from "react";

const EventModal = ({ isOpen, onClose, onSave, eventToEdit }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      const startDateTime = new Date(eventToEdit.start);
      const endDateTime = new Date(eventToEdit.end);
      
      setStartDate(startDateTime.toISOString().split('T')[0]);
      setStartTime(startDateTime.toTimeString().slice(0,5));
      setEndDate(endDateTime.toISOString().split('T')[0]);
      setEndTime(endDateTime.toTimeString().slice(0,5));
    }
  }, [eventToEdit]);

  const handleSubmit = () => {
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    
    onSave({ 
      id: eventToEdit?.id,
      title,
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString()
    });
    
    setTitle("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded flex-shrink-0 min-w-[300px]">
        <h2 className="text-xl">{eventToEdit ? 'Edit Event' : 'Add Event'}</h2>
        <input
          className="border p-2 w-full mt-2"
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">Start</label>
          <input
            className="border p-2 w-full mt-1"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            className="border p-2 w-full mt-1"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">End</label>
          <input
            className="border p-2 w-full mt-1"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input
            className="border p-2 w-full mt-1"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 mt-4">
          {eventToEdit ? 'Update' : 'Save'}
        </button>
        <button onClick={onClose} className="text-red-500 p-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EventModal;
