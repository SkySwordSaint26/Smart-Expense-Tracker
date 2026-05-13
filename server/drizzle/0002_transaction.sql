ALTER TABLE "Transactions" DROP CONSTRAINT "type_check";--> statement-breakpoint
ALTER TABLE "Transactions" ADD CONSTRAINT "type_check" CHECK ("Transactions"."type" IN ('income', 'expense'));