import { syncLogger } from '../logging/logger';

function handleExceptions(err: Error, title: string): void {
  syncLogger(err, title);
  process.exit(1);
}

export { handleExceptions };