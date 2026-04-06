import { existsSync, rmSync } from "node:fs";
import { spawn } from "node:child_process";

const nextDir = ".next";

if (existsSync(nextDir)) {
  rmSync(nextDir, { recursive: true, force: true });
}

const child = spawn("npx next dev -p 80", {
  shell: true,
  stdio: "inherit",
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});

