CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `prices` ADD `date` text NOT NULL;--> statement-breakpoint
ALTER TABLE `items` DROP COLUMN `price`;