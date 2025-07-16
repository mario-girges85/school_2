import { useState, useCallback } from "react";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: "info",
      title: "",
      message: "",
      dismissible: true,
      autoDismiss: 5000, // 5 seconds
      ...notification,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto dismiss if autoDismiss is set
    if (newNotification.autoDismiss) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.autoDismiss);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const success = useCallback(
    (message, title = "Success") => {
      return addNotification({ type: "success", title, message });
    },
    [addNotification]
  );

  const error = useCallback(
    (message, title = "Error") => {
      return addNotification({ type: "error", title, message });
    },
    [addNotification]
  );

  const warning = useCallback(
    (message, title = "Warning") => {
      return addNotification({ type: "warning", title, message });
    },
    [addNotification]
  );

  const info = useCallback(
    (message, title = "Information") => {
      return addNotification({ type: "info", title, message });
    },
    [addNotification]
  );

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    success,
    error,
    warning,
    info,
  };
};

export default useNotification;
