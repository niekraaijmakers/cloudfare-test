import {Env, Sitemap, SitemapIndex, SiteMapIndexGenerator} from "@/types";
import ArticleSitemapGenerator from "@/services/sitemaps/article-page-sitemap-generator";
import {PAGE_SIZE} from "@/constants";
import StandardPageSitemapGenerator from "@/services/sitemaps/standard-page-sitemap-generator";

export default class SiteMapIndexGeneratorImpl implements SiteMapIndexGenerator{

	constructor(private env:Env, private request:Request){

	}

	async getTotalPages(indexPath:string){
		const base = this.env.API_HOST;
		const results = await fetch(base + indexPath + '/query-index.json?offset=0&limit=1');
		const json: any = await results.json();
		return Math.ceil(json.total / PAGE_SIZE);
	}

	async generate(): Promise<SitemapIndex> {

		const sitemaps:Sitemap[] = [];
		const promiseArr:Promise<void>[] = [];


		promiseArr.push( (async () => {
			const totalSitemapPages:number = await this.getTotalPages('/article');
			for(let page = 1; page <= totalSitemapPages; page++){
				sitemaps.push(new ArticleSitemapGenerator(this.env, 'article-sitemap-' + page + '.xml').generate());
			}
			return Promise.resolve();
		})());

		sitemaps.push(new StandardPageSitemapGenerator(this.env).generate());

		await Promise.all(promiseArr);

		return Promise.resolve({
			sitemaps
		})
	}

}
