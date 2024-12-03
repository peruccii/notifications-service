import { randomUUID } from "crypto"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotification } from "./cancel-notification"
import { NotificationNotFound } from "./errors/notification-not-found"
import { makeNotification } from "@test/factories/notification-factory"

describe('Cancel notification', () => {
    it('should be able to cancel a notification', async () => {
        const notificationsReposiry = new InMemoryNotificationsRepository()
        const cancelNotification = new CancelNotification(notificationsReposiry)

        const notification = makeNotification()

        await notificationsReposiry.create(notification)

        await cancelNotification.execute({
            notificationId: notification.id
        })

        expect(notificationsReposiry.notifications[0].canceledAt).toEqual(expect.any(Date))
    })

    it('should not be able to cancel a non existing notification', () => {
        const notificationsReposiry = new InMemoryNotificationsRepository()
        const cancelNotification = new CancelNotification(notificationsReposiry)

        expect(() => {
            return cancelNotification.execute({
                notificationId: randomUUID()
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})
