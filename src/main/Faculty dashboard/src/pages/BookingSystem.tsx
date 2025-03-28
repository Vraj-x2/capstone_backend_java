import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRoomPosts, fetchRoomRequests } from '../services/api';

interface Room {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  postedBy: {
    name: string;
  };
}

interface RoomRequest {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  capacity: number;
  resources: string;
  requestedBy: {
    name: string;
  };
}

const BookingSystem: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomRequests, setRoomRequests] = useState<RoomRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [posts, requests] = await Promise.all([
          fetchRoomPosts(),
          fetchRoomRequests()
        ]);
        setRooms(posts);
        setRoomRequests(requests);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">Booking System</h1>
      <p className="text-gray-600">Book rooms and equipment for your lectures</p>

      {/* Available Rooms Table */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Available Rooms Posted by Other Faculty</h2>
          <Link
            to="/post-room"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Post Available Room
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(room.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.startTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.endTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.postedBy.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Link
                      to={`/room/${room.id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm mr-2"
                    >
                      Details
                    </Link>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm">
                      Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rooms.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No available rooms found
            </div>
          )}
        </div>
      </div>

      {/* Room Requests Table */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Room Requests</h2>
          <Link
            to="/new-room-request"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            New Request
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roomRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(request.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {request.startTime} - {request.endTime}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{request.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.requestedBy.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm">
                      Help
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {roomRequests.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No room requests found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;