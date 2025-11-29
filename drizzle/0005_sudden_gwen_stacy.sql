CREATE TABLE `prices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`price` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `items` ADD `source` text NOT NULL;--> statement-breakpoint
ALTER TABLE `items` ADD `price` integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `items_link_unique` ON `items` (`link`);