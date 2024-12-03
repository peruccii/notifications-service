import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";
import { Notification } from "@application/entities/notification";
import { NotificationNotFound } from "./errors/notification-not-found";

interface GetRecipientNotificationRequest {
    recipientId: string
}

interface GetRecipientNotificationResponse {
    notifications: Notification[]
};

@Injectable()
export class GetRecipientNotifications {
    constructor(private notificationsRepository: NotificationRepository) {}

    async execute(request: GetRecipientNotificationRequest): Promise<GetRecipientNotificationResponse> {
        const { recipientId } = request

        const notifications = await this.notificationsRepository.findManyNotificationsByRecipientId(recipientId)

        return { notifications }
    }
}
