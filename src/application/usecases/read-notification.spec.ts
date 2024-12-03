import { randomUUID } from "crypto"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { NotificationNotFound } from "./errors/notification-not-found"
import { makeNotification } from "@test/factories/notification-factory"
import { ReadNotification } from "./read-notification"

describe('Read notification', () => {
    it('should be able to read a notification', async () => {
        const notificationsReposiry = new InMemoryNotificationsRepository()
        const readNotification = new ReadNotification(notificationsReposiry)

        const notification = makeNotification()

        await notificationsReposiry.create(notification)

        await readNotification.execute({
            notificationId: notification.id
        })

        expect(notificationsReposiry.notifications[0].readAt).toEqual(expect.any(Date))
    })

    it('should not be able to read a non existing notification', () => {
        const notificationsReposiry = new InMemoryNotificationsRepository()
        const readNotification = new ReadNotification(notificationsReposiry)

        expect(() => {
            return readNotification.execute({
                notificationId: randomUUID()
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})
