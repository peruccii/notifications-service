import { randomUUID } from "crypto";
import { Notification } from "./notification";
import { Content } from "./content";

describe('NOTIFICATION', () => {
    it('should be able to create a   notification', () => {
        const content = new Notification({
            content: new Content('New solicitation'),
            category: 'test',
            recipientId: randomUUID(),
        });

        expect(content).toBeTruthy();
    })
})
