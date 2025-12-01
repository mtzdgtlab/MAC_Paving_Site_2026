import { describe, expect, it } from "vitest";
import {
  normalizePageUrl,
  resolveSiteUrl,
  resolveToAbsolute,
} from "../src/utils/seo";

const exampleSite = new URL("https://example.com/");

describe("SEO utility helpers", () => {
  describe("resolveSiteUrl", () => {
    it("returns provided site when passed", () => {
      expect(resolveSiteUrl(exampleSite)).toBe(exampleSite);
    });

    it("falls back to the default site when nothing is provided", () => {
      const fallback = resolveSiteUrl();
      expect(fallback).toBeInstanceOf(URL);
      expect(fallback.href).toBe("https://macpavingandsealcoating.com/");
    });
  });

  describe("resolveToAbsolute", () => {
    it("keeps absolute URLs unchanged", () => {
      const url = "https://cdn.test/image.png";
      expect(resolveToAbsolute(url, exampleSite)).toBe(url);
    });

    it("resolves relative string paths against the site", () => {
      expect(resolveToAbsolute("/image.png", exampleSite)).toBe(
        "https://example.com/image.png",
      );
    });

    it("resolves image metadata objects", () => {
      expect(
        resolveToAbsolute({ src: "/image.png" } as { src: string }, exampleSite),
      ).toBe("https://example.com/image.png");
    });

    it("returns an empty string when value is missing", () => {
      expect(resolveToAbsolute(undefined, exampleSite)).toBe("");
    });
  });

  describe("normalizePageUrl", () => {
    it("returns absolute URLs unchanged", () => {
      const url = "https://macpavingandsealcoating.com/services/";
      expect(normalizePageUrl(url, exampleSite)).toBe(url);
    });

    it("normalizes relative URLs against the site", () => {
      expect(normalizePageUrl("/services/", exampleSite)).toBe(
        "https://example.com/services/",
      );
    });

    it("handles URL instances", () => {
      const url = new URL("https://foo.test/page/");
      expect(normalizePageUrl(url, exampleSite)).toBe(url.href);
    });

    it("defaults to the site href when url is undefined", () => {
      expect(normalizePageUrl(undefined, exampleSite)).toBe(exampleSite.href);
    });
  });
});
