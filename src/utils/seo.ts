import type { ImageMetadata } from "astro";

const DEFAULT_SITE_URL = "https://macpavingandsealcoating.com";

export const resolveSiteUrl = (site?: URL) =>
  site ?? new URL(DEFAULT_SITE_URL);

export const resolveToAbsolute = (
  value: string | ImageMetadata | undefined,
  site: URL = resolveSiteUrl(),
) => {
  if (!value) return "";

  if (typeof value === "string") {
    if (value.startsWith("http")) return value;
    return new URL(value, site).href;
  }

  const src = value.src ?? "";
  return src ? new URL(src, site).href : "";
};

export const normalizePageUrl = (
  url: string | URL | undefined,
  site: URL = resolveSiteUrl(),
) => {
  if (!url) return site.href;

  if (url instanceof URL) return url.href;

  if (url.startsWith("http")) return url;

  return new URL(url, site).href;
};
