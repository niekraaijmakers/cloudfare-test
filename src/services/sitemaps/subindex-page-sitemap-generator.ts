import StandardPageSitemapGenerator from "@/services/sitemaps/standard-page-sitemap-generator";
import {Env, Sitemap, SitemapEntry, SiteMapGenerator} from "@/types";
import {PAGE_SIZE} from "@/constants";

export default class SubIndexSitemapGenerator implements SiteMapGenerator{
	constructor(private  env: Env, private index: string, private page:number) { }

	generate(): Sitemap {

		const base = this.env.API_HOST;
    const index:string	= this.index;
		const page:number = this.page;

		return {
			loc: base + "/sitemap-"+ this.index + "-" + page + ".xml",
			lastmod: "2021-09-01T00:00:00+00:00",
			async entries(): Promise<SitemapEntry[]> {
				const results = await fetch(base + '/' + index + '/query-index.json?offset=' + (PAGE_SIZE * (page - 1 )) + '&limit=' + PAGE_SIZE);
				const json: any = await results.json();

				return json.data.map((item: any) => {
					return {
						loc: base + item.path,
						lastmod: item.lastModified,
						image: base + item.image,
					}
				})
			}

		}
	}
};
