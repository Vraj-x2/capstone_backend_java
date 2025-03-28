import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  CalendarIcon,
  ClockIcon,
  MessageCircleIcon,
  UsersIcon,
  PackageIcon,
  MessageSquareIcon,
  HomeIcon,
  UserIcon,
  DoorOpenIcon,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const activeTab = location.pathname.split('/')[1];  // This will grab the first part of the URL path

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <HomeIcon size={20} />,
      path: '/',
    },
    {
      id: 'booking',
      name: 'Booking System',
      icon: <CalendarIcon size={20} />,
      path: '/booking',
    },
    {
      id: 'post-room',
      name: 'Post Room',
      icon: <DoorOpenIcon size={20} />,
      path: '/post-room',
    },
    {
      id: 'new-room-request',
      name: 'Room Request',
      icon: <PackageIcon size={20} />,
      path: '/new-room-request',
    },
    {
      id: 'schedule',
      name: 'Schedule Viewer',
      icon: <ClockIcon size={20} />,
      path: '/schedule',
    },
    {
      id: 'chat',
      name: 'Chat & Requests',
      icon: <MessageCircleIcon size={20} />,
      path: '/chat',
    },
    {
      id: 'crowd',
      name: 'Crowd Data',
      icon: <UsersIcon size={20} />,
      path: '/crowd',
    },
    {
      id: 'resources',
      name: 'Resource Management',
      icon: <PackageIcon size={20} />,
      path: '/resources',
    },
    {
      id: 'feedback',
      name: 'Feedback',
      icon: <MessageSquareIcon size={20} />,
      path: '/feedback',
    },
    {
      id: 'profile',
      name: 'Faculty Profile',
      icon: <UserIcon size={20} />,
      path: '/profile',
    },
  ];

  return (
    <aside className="bg-blue-800 text-white w-64 flex-shrink-0 hidden md:block">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Faculty Portal</h1>
      </div>
      <nav className="mt-8">
        <ul>
          {menuItems.map(item => (
            <li key={item.id} className="mb-2">
              <Link
                to={item.path}
                className={`flex items-center w-full px-4 py-3 text-left hover:bg-blue-700 transition-colors ${activeTab === item.id ? 'bg-blue-700' : ''
                  }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
