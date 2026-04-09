import Config, { RunMode } from '#src/Config.ts';
import { handlers } from '#src/modes.ts';

const argMode = process.argv[2] as RunMode;
const mode = argMode ?? Config.RUN_MODE_DEFAULT;

export default async function main() {
  const handler = handlers[mode];

  if (!handler) {
    throw new Error(`Invalid mode: ${mode}`);
  }

  await handler();
}

main();
