ALTER TABLE `category` ADD `created_at` text;--> statement-breakpoint
ALTER TABLE `category` ADD `updated_at` text;--> statement-breakpoint
CREATE UNIQUE INDEX `category_label_unique` ON `category` (`label`);--> statement-breakpoint
CREATE UNIQUE INDEX `category_value_unique` ON `category` (`value`);--> statement-breakpoint
ALTER TABLE `images` ADD `created_at` text;--> statement-breakpoint
ALTER TABLE `images` ADD `updated_at` text;--> statement-breakpoint
ALTER TABLE `user` ADD `updated_at` text;