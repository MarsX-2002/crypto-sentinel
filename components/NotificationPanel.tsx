
import React from 'react';
import { Notification, NotificationAction } from '../types';
import { InformationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon, XMarkIcon, TrashIcon } from './IconComponents';

interface NotificationPanelProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

const NotificationItem: React.FC<{ notification: Notification; onDismiss: (id: string) => void; onMarkAsRead: (id: string) => void; onClosePanel: () => void;}> = ({ notification, onDismiss, onMarkAsRead, onClosePanel }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'info':
        return <InformationCircleIcon className="w-5 h-5 text-blue-400" />;
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <XCircleIcon className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const handleActionClick = () => {
    if (notification.action) {
      notification.action.onAction();
      onClosePanel(); // Close panel after action
    }
  };
  
  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from bubbling to parent div if it also has an onClick
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
  };


  return (
    <div className={`p-3 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-150 ${notification.isRead ? 'opacity-70' : ''}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">{getIcon()}</div>
        <div className="flex-grow">
          <p className="text-sm text-gray-200">{notification.message}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(notification.timestamp).toLocaleString()}
          </p>
          {notification.action && (
            <button
              onClick={handleActionClick}
              className="mt-2 text-xs text-blue-400 hover:text-blue-300 hover:underline focus:outline-none"
            >
              {notification.action.label}
            </button>
          )}
        </div>
        <div className="flex-shrink-0 flex flex-col items-center space-y-1">
          {!notification.isRead && (
            <button
              onClick={handleMarkAsRead}
              className="text-xs text-gray-400 hover:text-green-400 p-1 rounded hover:bg-gray-600"
              title="Mark as read"
              aria-label="Mark as read"
            >
              <CheckCircleIcon className="w-4 h-4"/>
            </button>
          )}
          <button
            onClick={() => onDismiss(notification.id)}
            className="text-xs text-gray-400 hover:text-red-400 p-1 rounded hover:bg-gray-600"
            title="Dismiss notification"
            aria-label="Dismiss notification"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onDismiss, onMarkAsRead, onClearAll, onClose }) => {
  if (!notifications) return null;

  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.isRead !== b.isRead) {
      return a.isRead ? 1 : -1; // Unread first
    }
    return b.timestamp - a.timestamp; // Then newest first
  });

  return (
    <div className="absolute top-16 right-0 sm:right-4 mt-2 w-full max-w-md sm:w-96 bg-gray-800 rounded-lg shadow-2xl z-50 border border-gray-700">
      <div className="flex justify-between items-center p-3 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">Notifications</h3>
        <div className="flex items-center space-x-2">
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-red-400 hover:text-red-300 hover:underline p-1"
              title="Clear all notifications"
            >
             <TrashIcon className="w-4 h-4 mr-1 inline-block" /> Clear All
            </button>
          )}
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close notifications panel">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {sortedNotifications.length === 0 ? (
          <p className="p-4 text-sm text-gray-400 text-center">No new notifications.</p>
        ) : (
          sortedNotifications.map(notification => (
            <NotificationItem 
              key={notification.id} 
              notification={notification} 
              onDismiss={onDismiss}
              onMarkAsRead={onMarkAsRead}
              onClosePanel={onClose}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
