DROP INDEX `statistics_uuid_unique`;--> statement-breakpoint
ALTER TABLE `statistics` ADD `item_uuid` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `statistics_item_uuid_unique` ON `statistics` (`item_uuid`);--> statement-breakpoint
ALTER TABLE `statistics` DROP COLUMN `uuid`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text,
	`first_time` text DEFAULT '',
	`onboarded` text DEFAULT 'false',
	`version` text,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "uuid", "first_time", "onboarded", "version", "created_at", "updated_at") SELECT "id", "uuid", "first_time", "onboarded", "version", "created_at", "updated_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `images` ADD `item_uuid` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `images_item_uuid_unique` ON `images` (`item_uuid`);--> statement-breakpoint
ALTER TABLE `images` DROP COLUMN `uuid`;--> statement-breakpoint
ALTER TABLE `prices` ADD `item_uuid` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `prices_item_uuid_unique` ON `prices` (`item_uuid`);--> statement-breakpoint
ALTER TABLE `prices` DROP COLUMN `uuid`;