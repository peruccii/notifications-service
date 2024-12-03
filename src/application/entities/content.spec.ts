import { Content } from "./content";

describe('NOTIFICATION CONTENT', () => {
    it('should be able to create a notification content', () => {
        const content = new Content('You received an friend request');

        expect(content).toBeTruthy();
    })

    it('should be not able to create a notification content with less than 5 characters', () => {
        expect(() => new Content('You.')).toThrow();
    })

    it('should be not able to create a notification content with more than 240 characters', () => {
        expect(() => new Content('a'.repeat(241))).toThrow();
    })
})
