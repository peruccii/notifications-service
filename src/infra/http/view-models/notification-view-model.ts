import { Notification } from "@application/entities/notification";

export class NotificationViewModel {
    static toCreateFormatHTTP(notification: Notification) {
        return {
            id: notification.id,
            content: notification.content,
            category: notification.category,
            recipientId: notification.recipientId
        }
    }

    static toCountFormatHTTP(count: number) {
        return {
            count
        }
    }

    static toGetFormatHTTP(notification: Notification) {
        return {
            id: notification.id,
            content: notification.content,
            category: notification.category,
            recipientId: notification.recipientId,
            createdAt: notification.createdAt,
            readAt: notification.readAt,
            canceledAt: notification.canceledAt
        }
    }
}
