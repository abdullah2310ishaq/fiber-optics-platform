"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  markAllNotificationsRead,
  markNotificationRead,
  markNotificationUnread,
  subscribeAdminNotifications,
} from "@/lib/firestore/admin-notifications";
import type { AdminNotification } from "@/types/admin-notification";

interface AdminNotificationContextValue {
  notifications: AdminNotification[];
  unreadCount: number;
  loading: boolean;
  latestUnread: AdminNotification | null;
  clearLatestUnread: () => void;
  markRead: (id: string) => Promise<void>;
  markUnread: (id: string) => Promise<void>;
  markAllRead: () => Promise<void>;
  openNotification: (notification: AdminNotification) => Promise<string>;
}

const AdminNotificationContext = createContext<AdminNotificationContextValue | null>(null);

export function AdminNotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestUnread, setLatestUnread] = useState<AdminNotification | null>(null);
  const knownIdsRef = useRef<Set<string>>(new Set());
  const initializedRef = useRef(false);

  useEffect(() => {
    const unsubscribe = subscribeAdminNotifications(
      (items) => {
        if (initializedRef.current) {
          const newestUnread = items.find(
            (item) => !item.read && !knownIdsRef.current.has(item.id)
          );
          if (newestUnread) {
            setLatestUnread(newestUnread);
          }
        } else {
          initializedRef.current = true;
        }

        knownIdsRef.current = new Set(items.map((item) => item.id));
        setNotifications(items);
        setLoading(false);
      },
      () => setLoading(false)
    );

    return unsubscribe;
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  const markRead = useCallback(async (id: string) => {
    await markNotificationRead(id);
  }, []);

  const markUnread = useCallback(async (id: string) => {
    await markNotificationUnread(id);
  }, []);

  const markAllRead = useCallback(async () => {
    const unreadIds = notifications.filter((item) => !item.read).map((item) => item.id);
    await markAllNotificationsRead(unreadIds);
  }, [notifications]);

  const openNotification = useCallback(async (notification: AdminNotification) => {
    if (!notification.read) {
      await markNotificationRead(notification.id);
    }
    return notification.href;
  }, []);

  const clearLatestUnread = useCallback(() => setLatestUnread(null), []);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      loading,
      latestUnread,
      clearLatestUnread,
      markRead,
      markUnread,
      markAllRead,
      openNotification,
    }),
    [
      notifications,
      unreadCount,
      loading,
      latestUnread,
      clearLatestUnread,
      markRead,
      markUnread,
      markAllRead,
      openNotification,
    ]
  );

  return (
    <AdminNotificationContext.Provider value={value}>
      {children}
    </AdminNotificationContext.Provider>
  );
}

export function useAdminNotifications() {
  const context = useContext(AdminNotificationContext);
  if (!context) {
    throw new Error("useAdminNotifications must be used within AdminNotificationProvider");
  }
  return context;
}
