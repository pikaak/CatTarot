// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL ?? "";

if (!url) {
  console.warn(
    "[drizzle.config] DATABASE_URL not set — running without a database. " +
      "DB가 필요한 CLI(drizzle-kit push 등)는 URL 설정 전까지 실행되지 않을 수 있습니다."
  );
}

export default defineConfig({
  schema: "./shared/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
  verbose: true,
  strict: true,
});
