import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@application/usecases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/usecases/cancel-notification';
import { ReadNotification } from '@application/usecases/read-notification';
import { UnreadNotification } from '@application/usecases/unread-notification';
import { CountRecipientNotification } from '@application/usecases/count-notifications';
import { GetRecipientNotifications } from '@application/usecases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private sendNotification: SendNotification,
        private cancelNotification: CancelNotification,
        private readNotification: ReadNotification,
        private unreadNotification: UnreadNotification,
        private countRecipientNotification: CountRecipientNotification,
        private getRecipientNotifications: GetRecipientNotifications
    ) { }

    @Patch(':id/cancel')
    async cancel(@Param('id') id: string) {
        await this.cancelNotification.execute({notificationId: id})
    }

    @Get('count/from/:recipientId')
    async countFromRecipient(@Param('recipientId') recipientId: string) {
        const { count } = await this.countRecipientNotification.execute({
            recipientId
        })

        return { count: NotificationViewModel.toCountFormatHTTP(count) }
    }

    @Get('from/:recipientId')
    async getFromRecipient(@Param('recipientId') recipientId: string) {
        const { notifications } = await this.getRecipientNotifications.execute({
            recipientId
        })

        return { notifications: notifications.map((notifications) => {
            return NotificationViewModel.toGetFormatHTTP(notifications)
        }) }
    }

    @Patch(':id/read')
    async read(@Param('id') id: string) {
        await this.readNotification.execute({notificationId: id})
    }

    @Patch(':id/unread')
    async unread(@Param('id') id: string) {
        await this.unreadNotification.execute({notificationId: id})
    }

    @Post()
    async create(@Body() body: CreateNotificationBody) {
        const { recipientId, content, category } = body
        const { notification } = await this.sendNotification.execute({
            recipientId,
            category,
            content
        })

        return { notification: NotificationViewModel.toCreateFormatHTTP(notification) }
    }
}
