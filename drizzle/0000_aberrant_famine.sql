CREATE TABLE `documents` (
	`id` text PRIMARY KEY NOT NULL,
	`html` text NOT NULL,
	`revision` integer NOT NULL,
	`saved_at` text NOT NULL,
	`saved_by` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `images` (
	`key` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`bytes` integer NOT NULL,
	`type` text NOT NULL,
	`uploaded_by` text NOT NULL,
	`uploaded_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `members` (
	`user_id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`role` text NOT NULL,
	`joined_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `revisions` (
	`revision` integer PRIMARY KEY NOT NULL,
	`html` text NOT NULL,
	`saved_at` text NOT NULL,
	`saved_by` text NOT NULL
);
