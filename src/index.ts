import SitemapIndexPrinter from "@/services/sitemap-index-printer";
import {Sitemap, SitemapIndex} from "@/types";
import SitemapPrinter from "@/services/sitemap-printer";
import SiteMapIndexGeneratorImpl from "@/services/sitemap-index-generator";
import SiteMapGeneratorImpl from "@/services/sitemap-generator";



const getSitemapPath = (request:Request):string => {
	const url = new URL(request.url);
	const path = url.pathname;

	const matches: RegExpMatchArray | null = /sitemap\/(?<path>.*)/.exec(path);

	if(matches && matches.groups && matches.groups.path){
		return matches.groups.path;
	}
	return '';
}

const sitemapPrinter = new SitemapPrinter();
const sitemapIndexPrinter = new SitemapIndexPrinter();


const responseFromReadable = (readable: ReadableStream) => new Response(readable, {
		headers: {"content-type": "application/xml"},
		status: 200,
});


const generateSiteMapIndexResponse = (request:Request ):Response => {
	const { readable, writable } = new TransformStream()
	const index: SitemapIndex = new SiteMapIndexGeneratorImpl(request).generate();
	sitemapIndexPrinter.printSitemapIndex(index, writable.getWriter());

	return responseFromReadable(readable);
}

const generateSiteMapResponse = (request:Request, path:string ):Response => {
	const { readable, writable } = new TransformStream()
	const index: Sitemap = new SiteMapGeneratorImpl(request,path).generate();
	sitemapPrinter.printSitemapIndex(index, writable.getWriter());

	return responseFromReadable(readable);
}

export default {
	async fetch(request:Request) {

		const sitemapPath = getSitemapPath(request);

		if(sitemapPath.length > 0)
			return generateSiteMapResponse(request,sitemapPath);
		else
			return generateSiteMapIndexResponse(request);

	},
};
