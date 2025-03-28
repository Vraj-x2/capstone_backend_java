import React from 'react';
import { ClockIcon, CalendarIcon, BookOpenIcon } from 'lucide-react';
import RoomAvailabilityCard from '../components/RoomAvailabilityCard';
import UpcomingBookings from '../components/UpcomingBookings';
interface Notification {
  id: number;
  message: string;
  read: boolean;
}
interface DashboardProps {
  notifications: Notification[];
}
const Dashboard: React.FC<DashboardProps> = ({
  notifications
}) => {
  const todayClasses = [{
    id: 1,
    course: 'CS101',
    room: 'Room 305',
    time: '10:00 AM - 11:30 AM',
    status: 'scheduled'
  }, {
    id: 2,
    course: 'CS205',
    room: 'Lab 2B',
    time: '1:00 PM - 3:00 PM',
    status: 'scheduled'
  }, {
    id: 3,
    course: 'CS350',
    room: 'Room 101',
    time: '4:00 PM - 5:30 PM',
    status: 'online'
  }];
  return <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, Dr. Johnson
        </h1>
        <p className="text-gray-600">Here's your overview for today</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <ClockIcon size={24} className="text-blue-600 mr-3" />
            <h2 className="text-lg font-semibold">Current Time</h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
          </p>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString([], {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <CalendarIcon size={24} className="text-blue-600 mr-3" />
            <h2 className="text-lg font-semibold">Today's Classes</h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {todayClasses.length}
          </p>
          <p className="text-gray-600 mt-1">
            {todayClasses.filter(c => c.status === 'online').length} classes
            moved online
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <BookOpenIcon size={24} className="text-blue-600 mr-3" />
            <h2 className="text-lg font-semibold">Room Availability</h2>
          </div>
          <p className="text-3xl font-bold text-gray-800">5</p>
          <p className="text-gray-600 mt-1">
            Available rooms posted by faculty
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <RoomAvailabilityCard />
        <UpcomingBookings todayClasses={todayClasses} />
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
        {notifications.length === 0 ? <p className="text-gray-500">No recent notifications</p> : <div className="space-y-3">
            {notifications.map(notification => <div key={notification.id} className={`p-3 rounded-md ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                <p className="text-sm">{notification.message}</p>
              </div>)}
          </div>}
      </div>
    </div>;
};
export default Dashboard;