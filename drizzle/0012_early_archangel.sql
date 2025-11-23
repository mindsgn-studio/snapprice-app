PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`image` text NOT NULL,
	`title` text NOT NULL,
	`link` text NOT NULL,
	`source` text
);
--> statement-breakpoint
INSERT INTO `__new_items`("id", "uuid", "image", "title", "link", "source") SELECT "id", "uuid", "image", "title", "link", "source" FROM `items`;--> statement-breakpoint
DROP TABLE `items`;--> statement-breakpoint
ALTER TABLE `__new_items` RENAME TO `items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `items_uuid_unique` ON `items` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `items_link_unique` ON `items` (`link`);