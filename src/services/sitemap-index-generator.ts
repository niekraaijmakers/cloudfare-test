import {Env, Sitemap, SitemapIndex, SiteMapIndexGenerator} from "@/types";
import SubIndexSitemapGenerator from "@/services/sitemaps/subindex-page-sitemap-generator";
import {PAGE_SIZE} from "@/constants";
import StandardPageSitemapGenerator from "@/services/sitemaps/standard-page-sitemap-generator";

export default class SiteMapIndexGeneratorImpl implements SiteMapIndexGenerator{

	constructor(private env:Env, private request:Request){

	}

	async getTotalPages(indexPath:string){
		const base = this.env.API_HOST;
		const results = await fetch(base + '/' + indexPath + '/query-index.json?offset=0&limit=1');
		const json: any = await results.json();
		return Math.ceil(json.total / PAGE_SIZE);
	}

	getDelegateFn(sitemaps: Sitemap[], index:string){
		return  (async () => {
			const totalSitemapPages:number = await this.getTotalPages(index);
			for(let page = 1; page <= totalSitemapPages; page++){
				sitemaps.push(new SubIndexSitemapGenerator(this.env, index, page).generate());
			}
			return Promise.resolve();
		})()
	}

	async generate(): Promise<SitemapIndex> {

		const sitemaps:Sitemap[] = [];
		const promiseArr:Promise<void>[] = [];


		promiseArr.push(this.getDelegateFn(sitemaps, 'article'));
		promiseArr.push(this.getDelegateFn(sitemaps, 'video'));

		sitemaps.push(new StandardPageSitemapGenerator(this.env).generate());

		await Promise.all(promiseArr);

		return Promise.resolve({
			sitemaps
		})
	}

}
