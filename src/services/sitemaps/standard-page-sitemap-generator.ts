import {Env, Sitemap, SitemapEntry, SiteMapGenerator, SiteMapIndexPrinter} from "@/types";

export default class StandardPageSitemapGenerator implements SiteMapGenerator{
	constructor(private env: Env) {}


	async generate(): Promise<Sitemap> {

		const base = this.env.API_HOST;
		const results = await fetch(base + '/query-index.json?sheet=sitemap')
		const json: any = await results.json();

		let lastmod = 0;

		const entries = json.data.map((item: any) => {

			const lastModifiedParsed = parseInt(item.lastModified, 10);
			if(lastModifiedParsed > lastmod){
				lastmod = lastModifiedParsed;
			}

			const itemLastModDate = new Date();
			itemLastModDate.setMilliseconds(lastModifiedParsed);

			return {
				loc: base + item.path,
				lastmod: itemLastModDate.toISOString(),
				image: base + item.image,
			}
		})

		const lastModDate:Date = new Date();
		lastModDate.setMilliseconds(lastmod);

		return {
			entries,
			loc: base + "/sitemap-standard-pages.xml",
			lastmod: lastModDate.toISOString(),
		};
	}


}
