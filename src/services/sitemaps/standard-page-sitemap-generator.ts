import {Env, Sitemap, SitemapEntry, SiteMapGenerator, SiteMapIndexPrinter} from "@/types";

export default class StandardPageSitemapGenerator implements SiteMapGenerator{
	constructor(private env: Env) {}


	generate(): Sitemap {

		const base = this.env.API_HOST;

		return {
			async entries(): Promise<SitemapEntry[]> {

				const results = await fetch(base + '/query-index.json?sheet=sitemap')
				const json: any = await results.json();

				return json.data.map((item: any) => {
					return {
						loc: base + item.path,
						lastmod: item.lastModified,
						image: base + item.image,
					}
				})

			},
			loc: base + "/sitemap.xml",
			lastmod: "2021-09-01T00:00:00+00:00"

		};
	}


}
