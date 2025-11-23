ALTER TABLE `user` ADD `device` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `prices_date_unique` ON `prices` (`date`);