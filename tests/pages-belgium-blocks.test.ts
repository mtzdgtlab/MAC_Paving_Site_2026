import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import path from "node:path";

const pagePath = path.join(
  process.cwd(),
  "src/pages/services/belgium-blocks.astro",
);

describe("Belgium Blocks service page", () => {
  it("does not await static asset imports", async () => {
    const content = await readFile(pagePath, "utf8");

    expect(content).not.toMatch(/await\s+stoneBorderBg/);
    expect(content).not.toMatch(/await\s+logo/);
  });

  it("uses SocialMeta with the hero image asset", async () => {
    const content = await readFile(pagePath, "utf8");

    expect(content).toMatch(/<SocialMeta[\s\S]*image={stoneBorderBg}/);
    expect(content).toMatch(/const belgiumOgImage = toAbsolute\(stoneBorderBg\)/);
  });
});
