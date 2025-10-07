import multiply, {substract} from "./math";
import {fileURLToPath} from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("ESM multiply:", multiply(2, 3));
console.log("ESM substract:", substract(5, 2));
console.log("ESM __dirname:", __dirname);
console.log("ESM url:", import.meta.url);