import {Sitemap} from "@/models";

export function buildResponse(sitemaps: Sitemap[], status = 200) {
	// Build a HTML response containing the text
	const html = `<?xml version="1.0" encoding="UTF-8"?>
	<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${sitemaps.map(sitemap => sitemap.toString()).join("\n")}
	</sitemapindex>
  `;

	return new Response(html, {
		status,
		headers: {
			"Content-Type": "application/xml; charset=UTF-8",
		},
	});
}
