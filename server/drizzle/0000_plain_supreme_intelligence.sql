CREATE TABLE "Budgets" (
	"budget_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"category_id" integer,
	"amount" numeric(10, 2) NOT NULL,
	"month" date NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Categories" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" varchar(50),
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "Categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "Insights" (
	"insight_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"month" date,
	"total_spend" numeric(10, 2) DEFAULT 0,
	"top_category" varchar(100),
	"saving_suggestion" text
);
--> statement-breakpoint
CREATE TABLE "Transactions" (
	"transaction_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"category_id" integer,
	"amount" numeric(10, 2) NOT NULL,
	"description" text NOT NULL,
	"type" varchar NOT NULL,
	"transaction_date" date DEFAULT now(),
	"is_auto_categorized" boolean DEFAULT false,
	"note" text,
	"is_deleted" boolean DEFAULT 'false',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "type_check" CHECK ("Transactions"."type" IN ('income', 'expense'))
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	"email" varchar(150) NOT NULL,
	"roles" "roles" DEFAULT 'user',
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "Budgets" ADD CONSTRAINT "Budgets_user_id_Users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Budgets" ADD CONSTRAINT "Budgets_category_id_Categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."Categories"("category_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Insights" ADD CONSTRAINT "Insights_user_id_Users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_user_id_Users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_category_id_Categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."Categories"("category_id") ON DELETE set null ON UPDATE no action;