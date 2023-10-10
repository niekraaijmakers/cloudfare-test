import {Env, Sitemap, SiteMapGenerator} from "@/types";
import StandardPageSitemapGenerator from "@/services/sitemaps/standard-page-sitemap-generator";
import ArticleSitemapGenerator from "@/services/sitemaps/article-page-sitemap-generator";



export default class SiteMapGeneratorImpl implements SiteMapGenerator{

	constructor(private env:Env, private request:Request, private path:string){
	}

	getDelegate(){
		if(this.path === "page-sitemap.xml"){
			return new StandardPageSitemapGenerator(this.env);
		}
		if(this.path.startsWith("article-sitemap-")){
			return new ArticleSitemapGenerator(this.env, this.path);
		}
		return new StandardPageSitemapGenerator(this.env);
	}
	generate(): Sitemap {
		return this.getDelegate().generate();
	}

}
