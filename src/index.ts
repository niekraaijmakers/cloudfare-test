import SitemapIndexPrinter from "@/services/sitemap-index-printer";
import {SitemapIndex} from "@/types";
import SiteMapIndexGeneratorImpl from "@/services/sitemap-index-generator";

export default {
	async fetch(request:Request) {
		const { readable, writable } = new TransformStream()

		const printer:SitemapIndexPrinter = new SitemapIndexPrinter();
		const index:SitemapIndex = new SiteMapIndexGeneratorImpl(request).generate();
		printer.printSitemapIndex(index, writable.getWriter());

		return new Response(readable, {
			headers: { "content-type": "application/xml" },
		});
	},
};
