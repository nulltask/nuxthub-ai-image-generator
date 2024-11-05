import { z } from "zod";

export default eventHandler(async (event) => {
  const { prompt, pathname } = await readValidatedBody(
    event,
    z.object({
      pathname: z.string(),
      prompt: z.string(),
    }).parse
  );

  return useDrizzle()
    .insert(tables.images)
    .values({
      pathname,
      prompt,
      createdAt: new Date(),
    })
    .onConflictDoNothing();
});
