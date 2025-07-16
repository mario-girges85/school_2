import React, { createContext, useContext } from "react";
import useNotification from "../hooks/useNotification";
import NotificationContainer from "../components/ui/NotificationContainer";

const NotificationContext = createContext();

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const notificationHook = useNotification();

  return (
    <NotificationContext.Provider value={notificationHook}>
      {children}
      <NotificationContainer
        notifications={notificationHook.notifications}
        onRemove={notificationHook.removeNotification}
      />
    </NotificationContext.Provider>
  );
};
