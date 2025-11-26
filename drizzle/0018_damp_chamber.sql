CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`background` text,
	`color` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_title_unique` ON `category` (`title`);--> statement-breakpoint
ALTER TABLE `items` ADD `categoty_id` text;