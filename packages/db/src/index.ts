import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as users from "./schema/users";
import * as catalog from "./schema/catalog";
import * as orders from "./schema/orders";
import * as reservations from "./schema/reservations";
import * as audit from "./schema/audit";

export const schema = {
  ...users,
  ...catalog,
  ...orders,
  ...reservations,
  ...audit,
};

export function createDbClient(connectionString: string) {
  const client = postgres(connectionString);
  return drizzle(client, { schema });
}

export * from "./schema/users";
export * from "./schema/catalog";
export * from "./schema/orders";
export * from "./schema/reservations";
export * from "./schema/audit";