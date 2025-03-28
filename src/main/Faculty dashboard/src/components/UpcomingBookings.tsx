import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
interface Class {
  id: number;
  course: string;
  room: string;
  time: string;
  status: string;
}
interface UpcomingBookingsProps {
  todayClasses: Class[];
}
const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({
  todayClasses
}) => {
  return <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-4">Today's Schedule</h2>
      <div className="space-y-3">
        {todayClasses.map(classItem => <div key={classItem.id} className={`border ${classItem.status === 'online' ? 'border-blue-200 bg-blue-50' : 'border-gray-200'} rounded-md p-4`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{classItem.course}</h3>
                <p className="text-sm text-gray-600">
                  {classItem.room}, {classItem.time}
                </p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${classItem.status === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                {classItem.status === 'online' ? 'Online' : 'In-Person'}
              </div>
            </div>
          </div>)}
      </div>
      <button className="w-full mt-4 py-2 flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors">
        <span>View Full Schedule</span>
        <ArrowRightIcon size={16} className="ml-1" />
      </button>
    </div>;
};
export default UpcomingBookings;