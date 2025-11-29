DROP INDEX `statistics_uuid_unique`;--> statement-breakpoint
ALTER TABLE `statistics` ADD `item_id` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `statistics_item_id_unique` ON `statistics` (`item_id`);--> statement-breakpoint
ALTER TABLE `statistics` DROP COLUMN `uuid`;--> statement-breakpoint
ALTER TABLE `images` ADD `item_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `images` DROP COLUMN `uuid`;--> statement-breakpoint
ALTER TABLE `prices` ADD `item_id` text NOT NULL;--> statement-breakpoint
ALTER TABLE `prices` DROP COLUMN `uuid`;