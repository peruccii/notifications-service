import { Notification } from "src/application/entities/notification";
import { NotificationRepository } from "src/application/repositories/notification-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
    constructor(private prisma: PrismaService) {}

    async create(notification: Notification): Promise<void> {
        await this.prisma.notification.create({
            data: {
                id: notification.id,
                content: notification.content.value,
                category: notification.category,
                recipientId: notification.recipientId,
                readAt: notification.readAt,
                createdAt: notification.createdAt,
            }
        })
    }

}
