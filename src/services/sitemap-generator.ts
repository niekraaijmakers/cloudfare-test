import {Env, Sitemap, SiteMapGenerator} from "@/types";
import StandardPageSitemapGenerator from "@/services/sitemaps/standard-page-sitemap-generator";
import SubIndexSitemapGenerator from "@/services/sitemaps/subindex-page-sitemap-generator";



export default class SiteMapGeneratorImpl implements SiteMapGenerator{

	constructor(private env:Env, private request:Request, private path:string){
	}

	getDelegate(){

		const matches: RegExpMatchArray | null = new RegExp( "(?<index>[a-zA-Z]*)-(?<page>[0-9]*)\\.xml").exec(this.path);

		if((matches && matches.groups && matches.groups.page && matches.groups.index)){
			return new SubIndexSitemapGenerator(this.env, matches.groups.index, parseInt(matches.groups.page, 10));
		}else{
			return new StandardPageSitemapGenerator(this.env);
		}

	}
	generate(): Sitemap {
		return this.getDelegate().generate();
	}

}
