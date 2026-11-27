import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
const root = fileURLToPath(new URL("../", import.meta.url));
const endpoint = "https://kling-ai.prt.kuaishou.com/mcp";
const configs = ["mcp_config.json"];
for (const path of configs) test(`${path} uses the exact regional PRT endpoint`, () => {
  const config = JSON.parse(readFileSync(resolve(root, path), "utf8"));
  const servers = Object.entries(config.mcpServers).filter(([name]) => /kling/i.test(name));
  assert.equal(servers.length, 1);
  const url = servers[0][1].url ?? servers[0][1].serverUrl;
  assert.equal(url, endpoint);
  assert.ok(!url.endsWith("/plugin"));
});
test("routing reference resolves operational links inside this host package", () => {
  const path = resolve(root, "skills/kling-ai/references/workflow-routing.md");
  const content = readFileSync(path, "utf8");
  for (const [, target] of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    if (/^[a-z][a-z\d+.-]*:/i.test(target)) continue;
    const [file, anchor] = target.split("#");
    const destination = file ? resolve(dirname(path), file) : path;
    assert.ok(existsSync(destination), `Missing routing reference: ${target}`);
    if (anchor && file) {
      const headings = [...readFileSync(destination, "utf8").matchAll(/^#{1,6} (.+)$/gm)]
        .map(([, title]) => title.toLowerCase().replace(/[^\w -]/g, "").replace(/ /g, "-"));
      assert.ok(headings.includes(anchor), `Missing routing section: ${target}`);
    }
  }
});
