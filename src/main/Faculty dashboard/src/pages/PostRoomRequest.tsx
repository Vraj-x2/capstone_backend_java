import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoomRequest } from '../services/api';
import { fetchCurrentUser } from '../services/api';

interface RoomRequest {
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  capacity: number;
  resources: string;
}

const RoomRequestPage: React.FC = () => {
  const [roomRequest, setRoomRequest] = useState<RoomRequest>({
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    location: '',
    capacity: 0,
    resources: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const user = await fetchCurrentUser();
      await createRoomRequest({
        ...roomRequest,
        requestedBy: user.id
      });
      navigate('/booking');
    } catch (err) {
      console.error('Error submitting room request:', err);
      setError('Failed to submit room request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Room Request Form</h1>
      <p className="text-gray-600">Request a room for your event</p>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Room Request Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              value={roomRequest.date}
              onChange={(e) => setRoomRequest({ ...roomRequest, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Start Time</label>
            <input
              type="time"
              value={roomRequest.startTime}
              onChange={(e) => setRoomRequest({ ...roomRequest, startTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">End Time</label>
            <input
              type="time"
              value={roomRequest.endTime}
              onChange={(e) => setRoomRequest({ ...roomRequest, endTime: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={roomRequest.description}
              onChange={(e) => setRoomRequest({ ...roomRequest, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Describe the event"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              value={roomRequest.location}
              onChange={(e) => setRoomRequest({ ...roomRequest, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter location"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Capacity</label>
            <input
              type="number"
              value={roomRequest.capacity}
              onChange={(e) => setRoomRequest({ ...roomRequest, capacity: parseInt(e.target.value, 10) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter number of people"
              min="1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Resources</label>
            <input
              type="text"
              value={roomRequest.resources}
              onChange={(e) => setRoomRequest({ ...roomRequest, resources: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter any required resources"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomRequestPage;