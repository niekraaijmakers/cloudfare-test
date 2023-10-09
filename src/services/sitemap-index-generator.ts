import {Sitemap, SitemapIndex, SiteMapIndexGenerator} from "@/types";

export default class SiteMapIndexGeneratorImpl implements SiteMapIndexGenerator{

	constructor(private request:Request){

	}
	generate(): SitemapIndex {
		return {
			sitemaps: []
		}
	}

}
