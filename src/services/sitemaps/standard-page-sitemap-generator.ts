import {Sitemap, SiteMapGenerator} from "@/types";

export default class StandardPageSitemapGenerator implements SiteMapGenerator{
	generate(): Sitemap {
		return {
			loc: "https://www.example.com/sitemap.xml",
			lastmod: "2021-09-01T00:00:00+00:00",
			entries: [
				{
					loc: "https://www.example.com/my/page",
					lastmod: "2021-09-01T00:00:00+00:00",
					image: "https://www.example.com/images/example.png"
				},
			]
		};
	}

}
