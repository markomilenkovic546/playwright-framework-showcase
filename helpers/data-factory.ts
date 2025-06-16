import { faker } from '@faker-js/faker';
import { User } from '../types';

export default class DataFactory {
    createValidUserData(): User {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const username = faker.internet.username();
        // @ts-ignore
        const gender = faker.helpers.arrayElement(['Male', 'Female']);
        const password =
            faker.string.alpha({ length: 1, casing: 'upper' }) +
            faker.string.alpha({ length: 1, casing: 'lower' }) +
            faker.number.int({ min: 0, max: 9 }) +
            faker.string.alphanumeric(5);

        return {
            firstName,
            lastName,
            username,
            password,
            gender
        };
    }
}
