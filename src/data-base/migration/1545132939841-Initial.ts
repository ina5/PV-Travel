import {MigrationInterface, QueryRunner} from 'typeorm';

export class Initial1545132939841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `roles` (`id` varchar(255) NOT NULL, `name` varchar(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `users` (`id` varchar(255) NOT NULL, `firstName` varchar(100) NOT NULL, `lastName` varchar(100) NULL, `username` varchar(100) NOT NULL, `password` varchar(100) NOT NULL, `email` varchar(100) NOT NULL, `roleId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `locations` (`id` varchar(255) NOT NULL, `name` varchar(100) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `holidays` (`id` varchar(255) NOT NULL, `title` varchar(100) NOT NULL, `startDate` datetime NOT NULL, `endDate` datetime NOT NULL, `price` double NOT NULL, `description` text NOT NULL, `locationId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
        await queryRunner.query('CREATE TABLE `holidays_users_users` (`holidaysId` varchar(255) NOT NULL, `usersId` varchar(255) NOT NULL, PRIMARY KEY (`holidaysId`, `usersId`)) ENGINE=InnoDB');
        await queryRunner.query('ALTER TABLE `users` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`)');
        await queryRunner.query('ALTER TABLE `holidays` ADD CONSTRAINT `FK_54657bf16bf4f2746b64aa78e78` FOREIGN KEY (`locationId`) REFERENCES `locations`(`id`)');
        await queryRunner.query('ALTER TABLE `holidays_users_users` ADD CONSTRAINT `FK_419f3e7fb94eab10c3526ab0aea` FOREIGN KEY (`holidaysId`) REFERENCES `holidays`(`id`) ON DELETE CASCADE');
        await queryRunner.query('ALTER TABLE `holidays_users_users` ADD CONSTRAINT `FK_c831bad8cde2bca88bac1c98b4c` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `holidays_users_users` DROP FOREIGN KEY `FK_c831bad8cde2bca88bac1c98b4c`');
        await queryRunner.query('ALTER TABLE `holidays_users_users` DROP FOREIGN KEY `FK_419f3e7fb94eab10c3526ab0aea`');
        await queryRunner.query('ALTER TABLE `holidays` DROP FOREIGN KEY `FK_54657bf16bf4f2746b64aa78e78`');
        await queryRunner.query('ALTER TABLE `users` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`');
        await queryRunner.query('DROP TABLE `holidays_users_users`');
        await queryRunner.query('DROP TABLE `holidays`');
        await queryRunner.query('DROP TABLE `locations`');
        await queryRunner.query('DROP TABLE `users`');
        await queryRunner.query('DROP TABLE `roles`');
    }

}
