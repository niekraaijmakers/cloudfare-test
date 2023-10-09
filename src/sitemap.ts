import {Sitemap, SitemapEntry} from "@/types";

export class SitemapImpl implements Sitemap {
	constructor(public loc: string, public lastmod: string, public 	entries: SitemapEntry[]) {}

	toString(): string {
		return "<sitemap>" +	"<loc>" + this.loc + "</loc>" + "<lastmod>" + this.lastmod + "</lastmod>" + "</sitemap>";
	}

}

export function SiteMapFromObject(obj: any): Sitemap {
	return new SitemapImpl(obj.path, obj.lastmod, obj.entries);
}
