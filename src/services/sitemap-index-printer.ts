import {SitemapIndex} from "@/types";

export default class SitemapIndexPrinter {

	printSitemapIndex(index:SitemapIndex, writer:WritableStreamDefaultWriter): void {
		const textEncoder = new TextEncoder();

		const write = (text:string) => {
			writer.write(textEncoder.encode(text));
		}
		write('<?xml version="1.0" encoding="UTF-8"?>');
		write('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

		index.sitemaps.forEach(({loc,lastmod}) => {
			write("<sitemap>" +	"<loc>" + loc + "</loc>" + "<lastmod>" + lastmod + "</lastmod>" + "</sitemap>");
		});

		write('</sitemapindex>');
		writer.close();
	}

}


