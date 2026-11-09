import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const root = new URL("../", import.meta.url);
function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), "antigravity-plugin-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  for (const file of ["plugin.json", "mcp_config.json", "package.json", "README.md", "LICENSE", "assets", "skills", "scripts"]) {
    cpSync(new URL(file, root), join(dir, file), { recursive: true });
  }
  return dir;
}
function verify(dir) {
  const result = spawnSync(process.execPath, [join(dir, "scripts/verify-package.mjs")], { encoding: "utf8" });
  assert.ifError(result.error);
  assert.equal(result.signal, null);
  return result;
}
const editManifest = change => source => {
  const manifest = JSON.parse(source);
  change(manifest);
  return JSON.stringify(manifest);
};

test("accepts complete Antigravity QA metadata and bundled logo", t => {
  const result = verify(fixture(t));
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

for (const [name, path, change, diagnostic] of [
  ["unsupported manifest fields", "plugin.json", editManifest(p => { p.commands = "./commands"; }), "unexpected or missing manifest fields"],
  ["missing display metadata", "plugin.json", editManifest(p => { delete p.displayName; }), "unexpected or missing manifest fields"],
  ["mismatched version", "plugin.json", editManifest(p => { p.version = "2.0.0"; }), "manifest/package version mismatch"],
  ["invalid logo path", "plugin.json", editManifest(p => { p.logo = "../outside.png"; }), "logo path"],
  ["invalid author URL", "plugin.json", editManifest(p => { p.author.url = "https://example.com"; }), "author"],
  ["invalid homepage", "plugin.json", editManifest(p => { p.homepage = "https://example.com"; }), "homepage"],
  ["invalid repository", "plugin.json", editManifest(p => { p.repository = "https://example.com"; }), "repository"],
  ["invalid license", "plugin.json", editManifest(p => { p.license = "UNLICENSED"; }), "license"],
  ["invalid keywords", "plugin.json", editManifest(p => { p.keywords = []; }), "keywords"],
  ["invalid PNG logo", "assets/kling-logo.png", () => "not a PNG", "invalid PNG logo"],
  ["legacy MCP URL field", "mcp_config.json", s => s.replace('"serverUrl"', '"url"'), "serverUrl"],
  ["Claude-only instructions", "skills/kling-ai/SKILL.md", s => s + "\nRun /reload-plugins\n", "Claude-specific instruction"],
  ["missing reference", "skills/kling-ai/SKILL.md", s => s + "\n[Missing](missing.md)\n", "missing or unpackaged link"],
]) {
  test(`rejects ${name}`, t => {
    const dir = fixture(t);
    writeFileSync(join(dir, path), change(readFileSync(join(dir, path), "utf8")));
    const result = verify(dir);
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.ok(result.stderr.includes(diagnostic), result.stderr);
  });
}

test("rejects missing logo asset", t => {
  const dir = fixture(t);
  rmSync(join(dir, "assets/kling-logo.png"));
  const result = verify(dir);
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.ok(result.stderr.includes("missing logo file"), result.stderr);
});
