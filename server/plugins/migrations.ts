import { migrate } from "drizzle-orm/d1/migrator";

export default defineNitroPlugin(async () => {
  if (!import.meta.dev) return;

  onHubReady(async () => {
    await migrate(useDrizzle(), {
      migrationsFolder: "server/database/migrations",
    })
      .then(() => {
        console.log("Database migrations done");
      })
      .catch((err) => {
        console.error("Database migrations failed", err);
      });
  });
});
