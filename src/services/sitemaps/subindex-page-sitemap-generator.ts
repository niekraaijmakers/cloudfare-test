import {Env, Sitemap, SitemapEntry, SiteMapGenerator} from "@/types";

export default class SubIndexSitemapGenerator implements SiteMapGenerator{
	constructor(private  env: Env, private index: string, private page:number) { }

	async generate(): Promise<Sitemap> {

		const base = this.env.API_HOST;
    const index:string	= this.index;
		const page:number = this.page;

		const results = await fetch(base + '/' + index + '/query-index.json?offset=' + (this.env.PAGE_SIZE * (page - 1 )) + '&limit=' + this.env.PAGE_SIZE);
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
			loc: base + "/sitemap-"+ this.index + "-" + page + ".xml",
			lastmod: lastModDate.toISOString(),
			entries,
		}
	}
};
