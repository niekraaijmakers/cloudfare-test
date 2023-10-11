import {Env, Sitemap, SitemapEntry, SiteMapGenerator, SiteMapIndexPrinter} from "@/types";

export default class StandardPageSitemapGenerator implements SiteMapGenerator{
	constructor(private env: Env) {}


	async generate(): Promise<Sitemap> {

		const base = this.env.API_HOST;
		const results = await fetch(base + '/query-index.json?sheet=sitemap')
		const json: any = await results.json();

		let latestLastModifiedNumber = 0;
		let lastmod:string = "";

		const entries = json.data.map((item: any) => {

			const lastModifiedParsed = new Date(item.lastModified).getTime();
			if(lastModifiedParsed > latestLastModifiedNumber){
				lastmod = item.lastModified;
			}
			return {
				loc: base + item.path,
				lastmod: item.lastModified,
				image: base + item.image,
			}
		})

		return {
			entries,
			loc: base + "/sitemap.xml",
			lastmod
		};
	}


}
