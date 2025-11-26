CREATE TABLE `statistics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`current` integer,
	`average` integer,
	`change` integer,
	`highest` integer,
	`lowest` integer,
	`created_at` text,
	`updated_at` text
);
