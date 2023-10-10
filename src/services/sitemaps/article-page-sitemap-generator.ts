import StandardPageSitemapGenerator from "@/services/sitemaps/standard-page-sitemap-generator";
import {Env, Sitemap, SitemapEntry, SiteMapGenerator} from "@/types";
import {PAGE_SIZE} from "@/constants";

export default class ArticleSitemapGenerator implements SiteMapGenerator{
	constructor(private  env: Env, private path: string) { }

	generate(): Sitemap {

		const base = this.env.API_HOST;
		const matches: RegExpMatchArray | null = /article-(?<page>[0-9]*)\.xml/.exec(this.path);
		const page = (matches && matches.groups && matches.groups.page) ? parseInt(matches.groups.page, 10) : 1;

		return {
			loc: base + "/sitemap-article-" + page + ".xml",
			lastmod: "2021-09-01T00:00:00+00:00",
			async entries(): Promise<SitemapEntry[]> {
				const results = await fetch(base + '/article/query-index.json?offset=' + (PAGE_SIZE * (page - 1 )) + '&limit=' + PAGE_SIZE);
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
