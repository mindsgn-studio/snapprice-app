import type { Config } from 'drizzle-kit';

export default {
  schema: './schema/index.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;