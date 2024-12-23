import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaBell } from 'react-icons/fa';
import { messaging } from '../../config/firebase';
import { getToken, onMessage } from 'firebase/messaging';

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  useEffect(() => {
    // Firebase bildirim izni ve token alma
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging);
          console.log('Notification Token:', token);
        }
      } catch (err) {
        console.error('Bildirim izni alınamadı:', err);
      }
    };

    requestPermission();

    // Bildirim dinleyicisi
    const unsubscribe = onMessage(messaging, (payload) => {
      setNotifications(prev => [...prev, payload]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="relative">
      <button 
        className="relative p-2"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <FaBell className="text-xl text-gray-400" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Bildirimler</h3>
            {notifications.length === 0 ? (
              <p className="text-gray-500">Yeni bildiriminiz yok</p>
            ) : (
              <div className="space-y-2">
                {notifications.map((notification, index) => (
                  <div 
                    key={index}
                    className="p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <p className="font-medium">{notification.notification.title}</p>
                    <p className="text-sm text-gray-600">{notification.notification.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 