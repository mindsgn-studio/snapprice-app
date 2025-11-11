ALTER TABLE `items` ADD `uuid` text NOT NULL;--> statement-breakpoint
ALTER TABLE `items` DROP COLUMN `brand`;--> statement-breakpoint
ALTER TABLE `items` DROP COLUMN `price`;