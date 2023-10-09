import {Env, Sitemap, SiteMapGenerator, SiteMapIndexPrinter} from "@/types";

export default class StandardPageSitemapGenerator implements SiteMapGenerator{
	constructor(private env: Env) {}


	async generate(): Promise<Sitemap> {

		const base = this.env.API_HOST;

		const results = await fetch(base + '/query-index.json')
		const json:any = await results.json();

		// [
		//
		// 	{
		// 		loc: "https://www.example.com/my/page",
		// 		lastmod: "2021-09-01T00:00:00+00:00",
		// 		image: "https://www.example.com/images/example.png"
		// 	},
		// ]

		return {
			loc: "https://www.example.com/sitemap.xml",
			lastmod: "2021-09-01T00:00:00+00:00",
			entries: json.data.map((item:any) => {
				return {
					loc: base + item.path,
					lastmod: item.lastModified,
					image: base + item.image,
				}
			})
		};
	}


}
