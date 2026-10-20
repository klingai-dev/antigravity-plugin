import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
const root = new URL("../", import.meta.url);
for (const [name, path, change] of [
  ["Claude manifest fields", "plugin.json", s => s.replace('"name":', '"version":"1.0.0","name":')],
  ["legacy MCP URL field", "mcp_config.json", s => s.replace('"serverUrl"', '"url"')],
  ["Claude-only instructions", "skills/kling-ai/SKILL.md", s => s + "\nRun /reload-plugins\n"],
  ["missing reference", "skills/kling-ai/SKILL.md", s => s + "\n[Missing](missing.md)\n"],
]) {
  test(`rejects ${name}`, t => {
    const dir = mkdtempSync(join(tmpdir(), "antigravity-plugin-"));
    t.after(() => rmSync(dir, {recursive:true, force:true}));
    for (const file of ["plugin.json","mcp_config.json","package.json","README.md","LICENSE","skills","scripts"]) cpSync(new URL(file, root), join(dir,file), {recursive:true});
    writeFileSync(join(dir,path), change(readFileSync(join(dir,path),"utf8")));
    const result = spawnSync(process.execPath,[join(dir,"scripts/verify-package.mjs")],{encoding:"utf8"});
    assert.notEqual(result.status,0,result.stdout + result.stderr);
  });
}
