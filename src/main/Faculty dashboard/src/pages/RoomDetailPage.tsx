import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRoomPostById } from '../services/api';

interface Room {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  postedBy: {
    name: string;
    email: string;
  };
  description: string;
  location: string;
  capacity: number;
  resources: string;
  features: string;
}

const RoomDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadRoom = async () => {
      try {
        if (id) {
          const data = await fetchRoomPostById(parseInt(id));
          setRoom(data);
        }
      } catch (err) {
        console.error('Error loading room:', err);
        setError('Failed to load room details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!room) {
    return <div className="p-6">Room not found</div>;
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 rounded-lg"
      >
        Back
      </button>

      <h1 className="text-2xl font-bold text-gray-800">{room.name}</h1>
      <p className="text-gray-600">Details for {room.name}</p>

      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Room Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Posted By:</strong> {room.postedBy.name} ({room.postedBy.email})</p>
            <p><strong>Date:</strong> {new Date(room.date).toLocaleDateString()}</p>
            <p><strong>Start Time:</strong> {room.startTime}</p>
            <p><strong>End Time:</strong> {room.endTime}</p>
          </div>
          <div>
            <p><strong>Description:</strong> {room.description}</p>
            <p><strong>Location:</strong> {room.location}</p>
            <p><strong>Capacity:</strong> {room.capacity} people</p>
            <p><strong>Resources:</strong> {room.resources}</p>
            {room.features && <p><strong>Features:</strong> {room.features}</p>}
          </div>
        </div>
        <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Book This Room
        </button>
      </div>
    </div>
  );
};

export default RoomDetailPage;