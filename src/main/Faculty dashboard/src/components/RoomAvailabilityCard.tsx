import React, { useState } from 'react';
import { CheckCircleIcon } from 'lucide-react';
const RoomAvailabilityCard: React.FC = () => {
  const [myBookings, setMyBookings] = useState([{
    id: 1,
    course: 'CS101',
    room: 'Room 305',
    date: 'Today',
    time: '10:00 AM - 11:30 AM',
    madeAvailable: false
  }, {
    id: 2,
    course: 'CS205',
    room: 'Lab 2B',
    date: 'Today',
    time: '1:00 PM - 3:00 PM',
    madeAvailable: false
  }, {
    id: 3,
    course: 'CS350',
    room: 'Room 101',
    date: 'Today',
    time: '4:00 PM - 5:30 PM',
    madeAvailable: true
  }, {
    id: 4,
    course: 'CS101',
    room: 'Room 305',
    date: 'Tomorrow',
    time: '10:00 AM - 11:30 AM',
    madeAvailable: false
  }]);
  const handleMakeAvailable = (id: number) => {
    setMyBookings(bookings => bookings.map(booking => booking.id === id ? {
      ...booking,
      madeAvailable: true
    } : booking));
  };
  return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">Your Booked Rooms</h2>
      <p className="text-sm text-gray-600 mb-4">
        Mark rooms as available if you decide to conduct your lecture online
      </p>
      <div className="space-y-3">
        {myBookings.map(booking => <div key={booking.id} className={`border ${booking.madeAvailable ? 'border-green-200 bg-green-50' : 'border-gray-200'} rounded-md p-4`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">
                  {booking.course}: {booking.room}
                </h3>
                <p className="text-sm text-gray-600">
                  {booking.date}, {booking.time}
                </p>
              </div>
              {booking.madeAvailable ? <div className="flex items-center text-green-600 text-sm">
                  <CheckCircleIcon size={16} className="mr-1" />
                  <span>Posted as available</span>
                </div> : <button onClick={() => handleMakeAvailable(booking.id)} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                  Make Available
                </button>}
            </div>
          </div>)}
      </div>
    </div>;
};
export default RoomAvailabilityCard;