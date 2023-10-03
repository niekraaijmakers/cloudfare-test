export const SITEMAP_INDEX_OBJECT_NAME = "sitemapindex";

export async function handleRequest(request: Request, env: Bindings) {
	// Forward the request to the named Durable Object...
	const { SITEMAP_INDEX_GENERATOR } = env;
	const id = SITEMAP_INDEX_GENERATOR.idFromName(SITEMAP_INDEX_OBJECT_NAME);
	const stub = SITEMAP_INDEX_GENERATOR.get(id);
	return stub.fetch(request);
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest };

// Make sure we export the Counter Durable Object class
export { SitemapIndexGenerator } from "./sitemap-index-generator";
export default worker;
