import { desc } from "drizzle-orm";
import { useDrizzle } from "../utils/drizzle";

export default eventHandler(async (event) => {
  return useDrizzle()
    .select()
    .from(tables.images)
    .orderBy(desc(tables.images.createdAt))
    .all();
});
