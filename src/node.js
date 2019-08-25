import * as fs from 'fs';
import { convert } from './ksml.js';

for(const arg of process.argv.slice(2)) {
  let xml = fs.readFileSync(arg, 'utf8');
  fs.writeFileSync(arg+".ks", convert(xml));
}
