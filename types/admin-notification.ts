export type AdminNotificationType = "order" | "rfq";

export interface AdminNotification {
  id: string;
  type: AdminNotificationType;
  referenceId: string;
  title: string;
  body: string;
  href: string;
  read: boolean;
  createdAt: Date;
}

export interface CreateAdminNotificationInput {
  type: AdminNotificationType;
  referenceId: string;
  title: string;
  body: string;
  href: string;
}
