import { buildResponse } from "./response";
import {Sitemap} from "@/models";
import {SiteMapFromObject, SitemapImpl} from "@/sitemap";

export class SitemapIndexGenerator implements DurableObject {

	sitemaps:Sitemap[] = [];
	// Store this.state for later access
	constructor(private readonly state: DurableObjectState) {}

	async fetch(request: Request) {
		// Get the current count, defaulting to 0
		const storageMap:Map<string, Sitemap> = await this.state.storage.list();
		storageMap.forEach((value, key) => {
			this.sitemaps.push(SiteMapFromObject(value));
		});

		await this.state.storage.put("/some/path", new SitemapImpl("/sitemap.xml", "2021-09-01T00:00:00+00:00"));
		// Return response containing new value, potentially after incrementing/decrementing
		return buildResponse(this.sitemaps);
	}
}
