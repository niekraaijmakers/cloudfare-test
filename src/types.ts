export interface Env {
	API_HOST: string;
}

export interface SitemapEntry {
	loc: string,
	lastmod: string
	image?: string
}

export interface Sitemap {
	loc: string
	lastmod: string
	entries(): Promise<SitemapEntry[]>
}

export interface SitemapIndex {
	sitemaps: Sitemap[]
}

export interface SiteMapIndexGenerator{
	generate(): Promise<SitemapIndex>
}

export interface SiteMapIndexPrinter{

}

export interface SiteMapGenerator{
	generate(): Sitemap
}
