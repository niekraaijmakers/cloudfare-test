export interface Env {
	PAGE_SIZE: number;
	API_HOST: string;
	INDEXES: string;
}

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
	generate(): Promise<SitemapIndex>
}

export interface SiteMapGenerator{
	generate(): Promise<Sitemap>
}
