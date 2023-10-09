import {Sitemap} from "@/types";

export default class SitemapPrinter {

	printSitemapIndex(index:Sitemap, writer:WritableStreamDefaultWriter): void {
		const textEncoder = new TextEncoder();

		const write = (text:string) => {
			writer.write(textEncoder.encode(text));
		}
		write('<?xml version="1.0" encoding="UTF-8"?>');
		write('<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

		index.entries.forEach(({loc,lastmod, image}) => {
			const imageStr = (image) ? `<image:image><image:loc>${image}</image:loc></image:image>` : "";
			write(`<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod>${imageStr}</url>`);
		});

		write('</urlset>');
		writer.close();
	}

}
