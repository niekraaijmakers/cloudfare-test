export interface SitemapEntry {
	loc: string,
	lastmod: string
	image?: string
}

export interface Sitemap {
	loc: string
	lastmod: string
	entries: SitemapEntry[]
}

export interface SitemapIndex {
	sitemaps: Sitemap[]
}

export interface SiteMapIndexGenerator{
	generate(): SitemapIndex
}

export interface SiteMapGenerator{
	generate(): Sitemap
}
