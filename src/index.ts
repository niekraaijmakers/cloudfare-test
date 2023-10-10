import SitemapIndexPrinter from "@/services/sitemap-index-printer";
import {Env, Sitemap, SitemapIndex} from "@/types";
import SitemapPrinter from "@/services/sitemap-printer";
import SiteMapIndexGeneratorImpl from "@/services/sitemap-index-generator";
import SiteMapGeneratorImpl from "@/services/sitemap-generator";



const getSitemapPath = (request:Request):string => {
	const url = new URL(request.url);
	const path = url.pathname;

	const matches: RegExpMatchArray | null = /sitemap-(?<path>.*)/.exec(path);

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


const generateSiteMapIndexResponse = async (env:Env, request:Request ): Promise<Response> => {
	const { readable, writable } = new TransformStream()
	const index: SitemapIndex = await new SiteMapIndexGeneratorImpl(env, request).generate();
	sitemapIndexPrinter.printSitemapIndex(index, writable.getWriter());

	return responseFromReadable(readable);
}

const generateSiteMapResponse = async (env:Env, request:Request, path:string ) : Promise<Response> => {
	const { readable, writable } = new TransformStream()
	const index: Sitemap = await new SiteMapGeneratorImpl(env, request,path).generate();
	await sitemapPrinter.printSitemap(index, writable.getWriter());

	return responseFromReadable(readable);
}


export default {
	async fetch(request:Request, env: Env) {

		const sitemapPath = getSitemapPath(request);

		if(sitemapPath.length > 0)
			return generateSiteMapResponse(env, request, sitemapPath);
		else
			return generateSiteMapIndexResponse(env, request);

	},
};
