#!/usr/bin/env node

import assert from "node:assert/strict";
import { existsSync, lstatSync, readFileSync, readdirSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(join(root, path), "utf8");
const json = (path) => JSON.parse(read(path));
const pkg = json("package.json");
const plugin = json("plugin.json");
const mcp = json("mcp_config.json");
assert.deepEqual(Object.keys(plugin).sort(), ["$schema", "description", "name"]);
assert.equal(plugin.$schema, "https://antigravity.google/schemas/v1/plugin.json");
assert.equal(plugin.name, "kling-ai");
assert.ok(plugin.description.trim());
assert.deepEqual(mcp, { mcpServers: { "kling-ai": { serverUrl: "https://kling.ai/mcp/plugin" } } });

const skills = ["kling-ai", "kling-ai-generate-image", "kling-ai-generate-video"];
for (const name of skills) {
  const path = `skills/${name}/SKILL.md`;
  const frontmatter = read(path).match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? "";
  assert.equal(frontmatter.match(/^name:\s*([^\r\n]+)$/m)?.[1].trim(), name, path);
  assert.match(frontmatter, /^description:[ \t]*\S.+$/m, path);
}

const publicFiles = new Set([
  "plugin.json", "mcp_config.json", "README.md", "LICENSE",
]);
function collect(directory) {
  for (const name of readdirSync(join(root, directory))) {
    if (name === ".DS_Store" || name === "__MACOSX" || name.startsWith("._")) continue;
    const path = join(directory, name);
    const stat = lstatSync(join(root, path));
    assert.ok(!stat.isSymbolicLink(), `symbolic link in skills: ${path}`);
    assert.ok(!name.startsWith(".") && !/\.(bak|tmp|log)$/i.test(name), `development file in skills: ${path}`);
    if (stat.isDirectory()) collect(path);
    else if (stat.isFile()) publicFiles.add(path);
  }
}
collect("skills");

for (const path of publicFiles) {
  assert.ok(existsSync(join(root, path)), `missing public file: ${path}`);
  if (!/\.(md|json)$/.test(path)) continue;
  const content = read(path);
  assert.ok(!path.startsWith("skills/") || !/Claude Code|reload-plugins|\.mcp\.json/.test(content), `Claude-specific instruction in ${path}`);
  if (!path.endsWith(".md")) continue;
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].split("#")[0];
    if (!target || /^[a-z][a-z\d+.-]*:/i.test(target)) continue;
    const local = relative(root, resolve(root, dirname(path), target));
    assert.ok(local !== ".." && !local.startsWith(`..${sep}`) && !isAbsolute(local), `external file link in ${path}: ${target}`);
    assert.ok(publicFiles.has(local) && existsSync(join(root, local)), `missing or unpackaged link in ${path}: ${target}`);
  }
}

console.log(`Antigravity plugin ${pkg.version} verified: metadata, MCP connection, Skill identities, and public links.`);
