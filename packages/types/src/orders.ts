import { z } from "zod";

// Separate State Machines
export const ReservationStatusEnum = z.enum([
  "active",
  "consumed",
  "expired",
  "released",
]);

export const PaymentStatusEnum = z.enum([
  "pending",
  "successful",
  "failed",
  "refunded",
]);

export const FulfillmentStatusEnum = z.enum([
  "new",
  "processing",
  "ready_for_pickup",
  "fulfilled",
  "cancelled",
]);

export type ReservationStatus = z.infer<typeof ReservationStatusEnum>;
export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;
export type FulfillmentStatus = z.infer<typeof FulfillmentStatusEnum>;