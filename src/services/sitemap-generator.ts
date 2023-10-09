import {Sitemap, SiteMapGenerator} from "@/types";
import StandardPageSitemapGenerator from "@/services/sitemaps/standard-page-sitemap-generator";

export default class SiteMapGeneratorImpl implements SiteMapGenerator{

	constructor(private request:Request, private path:String){

	}

	getDelegate(){
		if(this.path === "page-sitemap.xml"){
			return new StandardPageSitemapGenerator();
		}
		return new StandardPageSitemapGenerator();
	}
	generate(): Sitemap {
		return this.getDelegate().generate();
	}

}
