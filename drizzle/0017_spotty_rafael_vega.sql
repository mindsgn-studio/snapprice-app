PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text,
	`first_time` text DEFAULT 'false',
	`onboarded` text DEFAULT 'false',
	`version` text,
	`created_at` text
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "uuid", "first_time", "onboarded", "version", "created_at") SELECT "id", "uuid", "first_time", "onboarded", "version", "created_at" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `items` ADD `created_at` text;--> statement-breakpoint
ALTER TABLE `items` ADD `updated_at` text;