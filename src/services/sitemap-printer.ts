import {Sitemap} from "@/types";

export default class SitemapPrinter {

	async printSitemap(index:Sitemap, writer:WritableStreamDefaultWriter): Promise<void> {
		const textEncoder = new TextEncoder();

		const write = (text:string) => {
			writer.write(textEncoder.encode(text));
		}
		write('<?xml version="1.0" encoding="UTF-8"?>\n');
		write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');

		const entries = await index.entries();
		entries.forEach(({loc,lastmod, image}) => {
			const imageStr = (image) ? `` : "";
			write(`<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod>${imageStr}</url>\n`);
		});

		write('</urlset>');
		writer.close();
	}

}
