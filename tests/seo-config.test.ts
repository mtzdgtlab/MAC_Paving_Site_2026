import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import path from "node:path";

const readFileFromProject = (relativePath: string) =>
  readFile(path.join(process.cwd(), relativePath), "utf8");

describe("SEO configuration files", () => {
  it("keeps image assets crawlable in robots.txt", async () => {
    const robots = await readFileFromProject("public/robots.txt");

    expect(robots).toMatch(/Allow:\s*\/assets\/imgs\//);
    expect(robots).toMatch(/Allow:\s*\/\s*$/m);
    expect(robots).toMatch(
      /Sitemap:\s*https:\/\/macpavingandsealcoating.com\/sitemap-index\.xml/,
    );
  });
});
