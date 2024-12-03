import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@application/usecases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { ReadNotification } from '@application/usecases/read-notification';
import { UnreadNotification } from '@application/usecases/unread-notification';
import { GetRecipientNotifications } from '@application/usecases/get-recipient-notifications';
import { CountRecipientNotification } from '@application/usecases/count-notifications';
import { CancelNotification } from '@application/usecases/cancel-notification';

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [
        SendNotification,
        ReadNotification,
        UnreadNotification,
        GetRecipientNotifications,
        CountRecipientNotification,
        CancelNotification
    ]
})
export class HttpModule { }
