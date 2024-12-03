import { randomUUID } from "crypto"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { NotificationNotFound } from "./errors/notification-not-found"
import { makeNotification } from "@test/factories/notification-factory"
import { UnreadNotification } from "./unread-notification"

describe('Unread notification', () => {
    it('should be able to unread a notification', async () => {
        const notificationsReposiry = new InMemoryNotificationsRepository()
        const unreadNotification = new UnreadNotification(notificationsReposiry)

        const notification = makeNotification({ readAt: new Date() })

        await notificationsReposiry.create(notification)

        await unreadNotification.execute({
            notificationId: notification.id
        })

        expect(notificationsReposiry.notifications[0].readAt).toBeNull()
    })

    it('should not be able to unread a non existing notification', () => {
        const notificationsReposiry = new InMemoryNotificationsRepository()
        const unreadNotification = new UnreadNotification(notificationsReposiry)

        expect(() => {
            return unreadNotification.execute({
                notificationId: randomUUID()
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})
