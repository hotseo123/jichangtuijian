import fs from 'fs';
import path from 'path';

export function getSites() {
  const file = path.join(process.cwd(), 'data', 'sites.json');
  return JSON.parse(fs.readFileSync(file, 'utf8')).sites;
}
