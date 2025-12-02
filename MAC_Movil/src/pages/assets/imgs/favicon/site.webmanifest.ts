import type { APIRoute } from "astro";
import androidChrome192 from "@/assets/imgs/favicon/android-chrome-192x192.webp";
import androidChrome512 from "@/assets/imgs/favicon/android-chrome-512x512.webp";
import maskableIcon from "@/assets/imgs/favicon/maskable-icon.webp";
import quoteIcon from "@/assets/imgs/favicon/quote-icon.webp";
import servicesIcon from "@/assets/imgs/favicon/services-icon.webp";
import homeMobile from "@/assets/imgs/screenshots/home-mobile.webp";
import homeDesktop from "@/assets/imgs/screenshots/home-desktop.webp";

const fallbackSite = new URL("https://macpavingandsealcoating.com");

const toAbsolute = (
  asset: { src: string } | string,
  base: URL
): string => {
  const src = typeof asset === "string" ? asset : asset.src;
  return new URL(src, base).href;
};

export const GET: APIRoute = ({ site }) => {
  const base = site ?? fallbackSite;

  const manifest = {
    name: "MAC Paving and Sealcoating",
    short_name: "MAC Paving",
    description:
      "Professional asphalt paving, sealcoating, and concrete services in New Jersey",
    icons: [
      {
        src: toAbsolute(androidChrome192, base),
        sizes: "192x192",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: toAbsolute(androidChrome512, base),
        sizes: "512x512",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: toAbsolute(maskableIcon, base),
        sizes: "512x512",
        type: "image/webp",
        purpose: "maskable",
      },
    ],
    theme_color: "#1A3164",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/?source=pwa",
    scope: "/",
    orientation: "portrait",
    lang: "en-US",
    dir: "ltr",
    categories: ["business", "construction", "services"],
    screenshots: [
      {
        src: toAbsolute(homeMobile, base),
        sizes: "750x1334",
        type: "image/webp",
        platform: "narrow",
        label: "Home Page Mobile View",
      },
      {
        src: toAbsolute(homeDesktop, base),
        sizes: "1920x1080",
        type: "image/webp",
        platform: "wide",
        label: "Home Page Desktop View",
      },
    ],
    shortcuts: [
      {
        name: "Get a Quote",
        short_name: "Quote",
        description: "Request a free quote for your project",
        url: "/contact/",
        icons: [
          {
            src: toAbsolute(quoteIcon, base),
            sizes: "96x96",
            type: "image/webp",
          },
        ],
      },
      {
        name: "Our Services",
        short_name: "Services",
        description: "View our complete range of services",
        url: "/services/",
        icons: [
          {
            src: toAbsolute(servicesIcon, base),
            sizes: "96x96",
            type: "image/webp",
          },
        ],
      },
    ],
    prefer_related_applications: false,
    related_applications: [],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
};
