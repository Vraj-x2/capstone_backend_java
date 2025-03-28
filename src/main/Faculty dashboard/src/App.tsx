import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import BookingSystem from './pages/BookingSystem';
import ScheduleViewer from './pages/ScheduleViewer';
import ChatSystem from './pages/ChatSystem';
import CrowdData from './pages/CrowdData';
import ResourceManagement from './pages/ResourceManagement';
import FeedbackSubmission from './pages/FeedbackSubmission';
import FacultyProfile from './pages/FacultyProfile';
import PostRoom from './pages/PostRoom';
import RoomDetailPage from './pages/RoomDetailPage';
import PostRoomRequest from './pages/PostRoomRequest';
import { fetchRoomPosts } from './services/api';

export function App() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Room 101 has been posted as available for today at 2:00 PM', read: false },
    { id: 2, message: 'Your booking for Room 305 is confirmed', read: false },
    { id: 3, message: 'New resource request from Dr. Smith', read: true },
  ]);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await fetchRoomPosts();
        setRooms(data);
      } catch (error) {
        console.error('Error loading rooms:', error);
      }
    };
    loadRooms();
  }, []);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header notifications={notifications} setNotifications={setNotifications} />
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard notifications={notifications} />} />
              <Route path="/booking" element={<BookingSystem />} />
              <Route path="/schedule" element={<ScheduleViewer />} />
              <Route path="/new-room-request" element={<PostRoomRequest />} />
              <Route path="/chat" element={<ChatSystem />} />
              <Route path="/crowd" element={<CrowdData />} />
              <Route path="/resources" element={<ResourceManagement />} />
              <Route path="/feedback" element={<FeedbackSubmission />} />
              <Route path="/profile" element={<FacultyProfile />} />
              <Route path="/post-room" element={<PostRoom />} />
              <Route path="/room/:id" element={<RoomDetailPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;