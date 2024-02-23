CREATE TABLE `post` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text,
	`likes` int,
	`userId` int,
	CONSTRAINT `post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` text,
	`phone` varchar(256),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
