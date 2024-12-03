import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationRepository } from "../repositories/notification-repository";

interface SendNotificationRequest {
    recipientId: string;
    content: string;
    category: string;
}

interface SendNotificationResponse {
    notification: Notification
}

export class SendNotification {
    constructor(private notificationsRepository: NotificationRepository) {}

    async send(request: SendNotificationRequest): Promise<SendNotificationResponse> {
        const { category, content, recipientId } = request

        const notification = new Notification({
            category,
            content: new Content(content),
            recipientId
        })

        await this.notificationsRepository.create(notification)

        return { notification }
    }
}
