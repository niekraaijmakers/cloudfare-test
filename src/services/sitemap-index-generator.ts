import {Env, Sitemap, SitemapIndex, SiteMapIndexGenerator} from "@/types";

export default class SiteMapIndexGeneratorImpl implements SiteMapIndexGenerator{

	constructor(private env:Env, private request:Request){

	}
	generate(): Promise<SitemapIndex> {
		return Promise.resolve({
			sitemaps: []
		})
	}

}
