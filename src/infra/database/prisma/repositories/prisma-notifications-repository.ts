import { Notification } from "src/application/entities/notification";
import { NotificationRepository } from "src/application/repositories/notification-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
    constructor(private prisma: PrismaService) { }

    async findManyNotificationsByRecipientId(recipientId: string): Promise<Notification[]> {
        const notications = await this.prisma.notification.findMany({
            where: {
                recipientId
            }
        })

        return notications.map((notification) => {
            return PrismaNotificationMapper.toDomain(notification)
        })
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prisma.notification.count({
            where: {
                recipientId
            }
        })

        return count;
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({
            where: {
                id: notificationId
            }
        })

        if (!notification) return null

        return PrismaNotificationMapper.toDomain(notification);
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);

        await this.prisma.notification.update({
            where: {
                id: raw.id,
            },
            data: raw
        })
    }

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification)
        await this.prisma.notification.create({ data: raw })
    }

}
