import z from "zod";

// ID Primitives
export const UUIDSchema = z.string().uuid();

// Money Rule: Stored as positive integer minor units (pesewas)
export const MoneySchema = z
  .number()
  .int({ message: "Money must be an integer represented in pesewas" })
  .nonnegative({ message: "Money must be a non-negative integer" });

// ISO Timestamp
export const TimestampSchema= z.string().datetime()

// Standard Pagination Query
export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

// Standard API Response Envelope
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    message: z.string().optional(),
    correlationId: z.string().optional(),
  });

export type Money = z.infer<typeof MoneySchema>;
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;