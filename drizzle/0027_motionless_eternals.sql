DROP INDEX `statistics_item_id_unique`;--> statement-breakpoint
ALTER TABLE `statistics` ADD `uuid` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `statistics_uuid_unique` ON `statistics` (`uuid`);--> statement-breakpoint
ALTER TABLE `statistics` DROP COLUMN `item_id`;--> statement-breakpoint
ALTER TABLE `images` ADD `uuid` text NOT NULL;--> statement-breakpoint
ALTER TABLE `images` DROP COLUMN `item_id`;--> statement-breakpoint
ALTER TABLE `prices` ADD `uuid` text NOT NULL;--> statement-breakpoint
ALTER TABLE `prices` DROP COLUMN `item_id`;