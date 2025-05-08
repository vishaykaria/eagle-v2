import React from 'react';

const notifications = [
  {
    id: 1,
    title: 'Salary received',
    description: 'Your monthly salary was deposited to your Current Account',
    time: '2 hours ago',
    isRead: false,
    type: 'transaction'
  },
  {
    id: 2,
    title: 'ISA dividend payment',
    description: 'You received a dividend payment of £15.75',
    time: '1 day ago',
    isRead: true,
    type: 'investment'
  },
  {
    id: 3,
    title: 'SIPP annual statement',
    description: 'Your annual pension statement is ready to view',
    time: '3 days ago',
    isRead: true,
    type: 'pension'
  }
];

const typeColors = {
  transaction: 'bg-primary-100 text-primary-800',
  investment: 'bg-secondary-100 text-secondary-800',
  pension: 'bg-accent-100 text-accent-800'
};

const NotificationsPanel: React.FC = () => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-20 animate-fade-in">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
          <span className="text-xs text-primary-600 hover:text-primary-800 cursor-pointer">
            Mark all as read
          </span>
        </div>
      </div>
      
      <div className="overflow-y-auto max-h-96">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.isRead ? 'bg-primary-50' : ''}`}
          >
            <div className="flex items-start">
              <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${!notification.isRead ? 'bg-primary-500' : 'bg-transparent'}`}></div>
              <div className="ml-2 flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-900">{notification.title}</span>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeColors[notification.type as keyof typeof typeColors]}`}>
                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-center">
        <a href="#" className="text-sm text-primary-600 hover:text-primary-800">
          View all notifications
        </a>
      </div>
    </div>
  );
};

export default NotificationsPanel;