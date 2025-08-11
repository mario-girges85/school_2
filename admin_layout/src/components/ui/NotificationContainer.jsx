import React from "react";
import Alert from "./Alert";

const NotificationContainer = ({ notifications, onRemove }) => {
  if (!notifications || notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          dismissible={notification.dismissible}
          onClose={() => onRemove(notification.id)}
          className="shadow-lg"
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
