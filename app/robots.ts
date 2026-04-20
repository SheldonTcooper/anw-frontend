import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/painel"],
      },
    ],
    sitemap: "https://www.acompanhantesnaweb.com.br/sitemap.xml",
  };
}