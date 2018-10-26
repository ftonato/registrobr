const fetch = require('node-fetch');
const fs = require('fs');
const $ = require('cheerio');

let output = {};

function exportToFile() {
	fs.writeFileSync('domains.json', JSON.stringify(output, null, 4));
}

function parseTlds($category, category_name) {
	let restriction = '';
	$category.find('tr').map((i, e) => {
		var $row = $(e);
		const $restriction = $row.find('th');
		if ($restriction.length) {
			restriction = $restriction.text().trim();
			return;
		}

		var tld_name = $row.find('td:nth-child(1)').text().trim().toLowerCase();
		output[tld_name] = {
			category_name: category_name,
			tld_name: tld_name,
			tld_description: $row.find('td:nth-child(2)').text().trim()
		};

		if (restriction) {
			output[tld_name]['restriction'] = restriction;
		}
	});

}

function parseCategories(content) {
	const $categories = $(content).find('.category');
	$categories.map((i, e) => {
		const $category = $(e);
		const title = $category.find('.title').text().trim();
		parseTlds($category, title);
	});

	exportToFile();

}

fetch('https://registro.br/dominio/categoria.html')
	.then(response => response.text())
	.then(parseCategories)
