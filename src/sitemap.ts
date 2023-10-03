import {Sitemap} from "@/models";

export class SitemapImpl implements Sitemap {
	constructor(public path: string, public lastmod: string) {}

	toString(): string {
		return "<sitemap>" +	"<loc>" + this.path + "</loc>" + "<lastmod>" + this.lastmod + "</lastmod>" + "</sitemap>";
	}

}

export function SiteMapFromObject(obj: any): Sitemap {
	return new SitemapImpl(obj.path, obj.lastmod);
}
