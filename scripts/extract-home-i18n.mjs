import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const pagePath = path.join(root, "src", "app", "page.tsx");
const lines = fs.readFileSync(pagePath, "utf8").split(/\r?\n/);

function dedent(block) {
  const raw = block.split("\n");
  const nonempty = raw.filter((l) => l.trim().length);
  if (!nonempty.length) return block;
  const min = Math.min(...nonempty.map((l) => (/^\s*/.exec(l) || [""])[0].length));
  return raw.map((l) => (l.trim() ? l.slice(min) : "")).join("\n");
}

/** Lines 231–557 (1-based): object body inside `? { … }` (exclude closing `}`). */
const viCore = dedent(lines.slice(230, 557).join("\n"));
/** Lines 560–886 (1-based): English branch body (exclude `},`). */
const enCore = dedent(lines.slice(559, 886).join("\n"));
const dir = path.join(root, "src", "i18n", "messages");
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(
  path.join(dir, "home.vi.ts"),
  `export const homeVi = {\n${viCore}\n};\nexport type HomeMessages = typeof homeVi;\n`,
);
fs.writeFileSync(
  path.join(dir, "home.en.ts"),
  `import type { HomeMessages } from "./home.vi";\n\nexport const homeEn: HomeMessages = {\n${enCore}\n};\n`,
);
console.log("ok", viCore.length, enCore.length);
