
import React, { forwardRef } from 'react';
import { BellIcon } from './IconComponents';

interface NotificationIndicatorProps {
  unreadCount: number;
  onClick: () => void;
}

const NotificationIndicator = forwardRef<HTMLButtonElement, NotificationIndicatorProps>(
  ({ unreadCount, onClick }, ref) => {
    return (
      <button
        ref={ref} // Forward the ref to the button
        onClick={onClick}
        className="relative p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white rounded-full"
        aria-label={`View notifications (${unreadCount} unread)`}
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block h-5 w-5 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-red-600 text-white text-xs flex items-center justify-center ring-2 ring-gray-800">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
    );
  }
);

NotificationIndicator.displayName = 'NotificationIndicator'; // For better debugging in DevTools

export default NotificationIndicator;
