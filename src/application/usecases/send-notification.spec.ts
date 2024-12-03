import { randomUUID } from "crypto"
import { SendNotification } from "./send-notification"
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"

describe('Send notification', () => {
    it('should be able to send a notification', async () => {
        const notificationsReposiry = new InMemoryNotificationsRepository()
        const sendNotification = new SendNotification(notificationsReposiry)

        const { notification } = await sendNotification.execute({
            category: 'Social',
            content: 'New request',
            recipientId: randomUUID()
        })

        expect(notificationsReposiry.notifications).toHaveLength(1)
        expect(notificationsReposiry.notifications[0]).toEqual(notification)
    })
})
