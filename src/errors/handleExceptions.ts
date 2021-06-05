import { writeFileSync } from 'fs';
import { resolve } from 'path';

function handleExceptions(err: Error, title: string): void {
  const dateNow = new Date().toISOString().slice(0,19);
  writeFileSync(resolve(__dirname, '../logging/error-logs.log'), `${dateNow} ${title}: ${err.message}\n`, { flag: 'a'});
  process.stderr.write(`Error message: ${err.message}\n`);
  process.exit(1);
}

export { handleExceptions };