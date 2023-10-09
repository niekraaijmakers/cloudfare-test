import {Env, Sitemap, SiteMapGenerator} from "@/types";
import StandardPageSitemapGenerator from "@/services/sitemaps/standard-page-sitemap-generator";

export default class SiteMapGeneratorImpl implements SiteMapGenerator{

	constructor(private env:Env, private request:Request, private path:String){

	}

	getDelegate(){
		if(this.path === "page-sitemap.xml"){
			return new StandardPageSitemapGenerator(this.env);
		}
		return new StandardPageSitemapGenerator(this.env);
	}
	generate(): Promise<Sitemap> {
		return this.getDelegate().generate();
	}

}
