CREATE TABLE "Users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"password" varchar(255) NOT NULL,
	"email" varchar(150) NOT NULL,
	"role" varchar(10) DEFAULT 'user',
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
