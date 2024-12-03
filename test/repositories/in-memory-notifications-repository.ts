import { Notification } from "@application/entities/notification"
import { NotificationRepository } from "@application/repositories/notification-repository"


export class InMemoryNotificationsRepository implements NotificationRepository {
    public notifications: Notification[] = []

    async findManyNotificationsByRecipientId(recipientId: string): Promise<Notification[]> {
        return this.notifications.filter((notification) => notification.recipientId === recipientId)
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        return this.notifications.filter((notification) => notification.recipientId === recipientId).length
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = this.notifications.find((notification) => notification.id === notificationId)
        return notification ?? null;
    }
    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex((item) => item.id === notification.id)
         if (notificationIndex >= 0) {
            this.notifications[notificationIndex] = notification
         }
    }

    async create(notification: Notification) {
        this.notifications.push(notification)
    }
}
