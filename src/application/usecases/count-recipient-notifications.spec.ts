import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CountRecipientNotification } from "./count-notifications"
import { makeNotification } from "@test/factories/notification-factory"

describe('Count recipient notification', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationsReposiry = new InMemoryNotificationsRepository()
        const countRecipientNotifications = new CountRecipientNotification(notificationsReposiry)

        await notificationsReposiry.create(
            makeNotification({ recipientId: 'same-recipient-id' })
        )

        await notificationsReposiry.create(
            makeNotification({ recipientId: 'same-recipient-id' })
        )

        await notificationsReposiry.create(
            makeNotification({ recipientId: 'different-recipient-id' })
        )

        const { count } = await countRecipientNotifications.execute({
            recipientId: 'same-recipient-id'
        })

        expect(count).toEqual(2)
    })
})
