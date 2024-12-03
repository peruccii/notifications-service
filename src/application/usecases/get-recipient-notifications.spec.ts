import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { makeNotification } from "@test/factories/notification-factory"
import { GetRecipientNotifications } from "./get-recipient-notifications"

describe('Get recipient notification', () => {
    it('should be able to get recipient notifications', async () => {
        const notificationsReposiry = new InMemoryNotificationsRepository()
        const getRecipientNotifications = new GetRecipientNotifications(notificationsReposiry)

        await notificationsReposiry.create(
            makeNotification({ recipientId: 'same-recipient-id' })
        )

        await notificationsReposiry.create(
            makeNotification({ recipientId: 'same-recipient-id' })
        )

        await notificationsReposiry.create(
            makeNotification({ recipientId: 'different-recipient-id' })
        )

        const { notifications } = await getRecipientNotifications.execute({
            recipientId: 'same-recipient-id'
        })

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId: 'same-recipient-id' }),
            expect.objectContaining({ recipientId: 'same-recipient-id' })
        ]))
    })
})
