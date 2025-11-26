ALTER TABLE `statistics` ADD `uuid` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `statistics_uuid_unique` ON `statistics` (`uuid`);