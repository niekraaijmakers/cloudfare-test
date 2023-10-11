import {Env, Sitemap, SitemapIndex, SiteMapIndexGenerator} from "@/types";
import SubIndexSitemapGenerator from "@/services/sitemaps/subindex-page-sitemap-generator";

import StandardPageSitemapGenerator from "@/services/sitemaps/standard-page-sitemap-generator";

export default class SiteMapIndexGeneratorImpl implements SiteMapIndexGenerator{

	constructor(private env:Env, private request:Request){

	}

	async getTotalPages(indexPath:string){
		console.log("getting total pages for " + indexPath);
		const base = this.env.API_HOST;
		const results = await fetch(base + '/' + indexPath + '/query-index.json?offset=0&limit=1');

		if(results.status === 200){
			const json: any = await results.json();
			return Math.ceil(json.total / this.env.PAGE_SIZE);
		}else{
			return 0;
		}

	}

	async getDelegateFn( index:string){

			const totalSitemapPages:number = await this.getTotalPages(index);
			const indexPromises:Promise<Sitemap>[] = [];
			for(let page = 1; page <= totalSitemapPages; page++){
				const subIndexGenerator = new SubIndexSitemapGenerator(this.env, index, page);
				indexPromises.push(subIndexGenerator.generate());
			}
			return indexPromises;

	}

	async generate(): Promise<SitemapIndex> {

		const promiseArr:Promise<Sitemap>[] = [];

		for (const index of this.env.INDEXES.split(",")) {
			const indexPromises = await this.getDelegateFn(index);
			indexPromises.forEach((sitemapPromise:Promise<Sitemap>) => {
				promiseArr.push(sitemapPromise)
			});
		}
		promiseArr.push(new StandardPageSitemapGenerator(this.env).generate());

		const sitemaps = await Promise.all(promiseArr);

		return {
			sitemaps
		}
	}

}
