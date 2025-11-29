PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text NOT NULL,
	`image` text NOT NULL,
	`brand` text DEFAULT '',
	`title` text NOT NULL,
	`link` text NOT NULL,
	`source` text,
	`categoty_id` integer,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
INSERT INTO `__new_items`("id", "uuid", "image", "brand", "title", "link", "source", "categoty_id", "created_at", "updated_at") SELECT "id", "uuid", "image", "brand", "title", "link", "source", "categoty_id", "created_at", "updated_at" FROM `items`;--> statement-breakpoint
DROP TABLE `items`;--> statement-breakpoint
ALTER TABLE `__new_items` RENAME TO `items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `items_uuid_unique` ON `items` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `items_link_unique` ON `items` (`link`);