const stopPhishing = require('stop-discord-phishing');
const fs = require('fs');

const filteredWordreplacements = [
	{
		word: 'witch.tv',
		replacement: [
			'https://witch.tv',
			'http://witch.tv',
			'https://www.witch.tv',
			'http://www.witch.tv',
		],
	},
	{
		word: 'mmunity.com',
		replacement: [
			'https://mmunity.com',
			'http://mmunity.com',
			'https://www.mmunity.com',
			'http://www.mmunity.com',
		],
	},
	{
		word: 'steamcommunity.co',
		replacement: [
			'https://steamcommunity.co/',
			'http://steamcommunity.co/',
			'https://www.steamcommunity.co/',
			'http://www.steamcommunity.co/',
		],
	},
	{
		word: 'discordapp.co',
		replacement: [
			'https://discordapp.co/',
			'http://discordapp.co/',
			'https://www.discordapp.co/',
			'http://www.discordapp.co/',
		],
	},
	{
		word: 'steampower.co',
		replacement: [
			'https://steampower.co/',
			'http://steampower.co/',
			'https://www.steampower.co/',
			'http://www.steampower.co/',
		],
	},
	{
		word: 'discord-app.co',
		replacement: [
			'https://discord-app.co/',
			'http://discord-app.co/',
			'https://www.discord-app.co/',
			'http://www.discord-app.co/',
		],
	},
];

// https://github.com/nikolaischunk/discord-phishing-links#known-missing-domains
const missingFromSource = [
	'https://ord.gg/',
	'http://ord.gg/',
	'https://www.ord.gg/',
	'http://www.ord.gg/',
	'https://cutt.us/nitro-subscribe',
	'http://cutt.us/nitro-subscribe',
	'https://cutt.us/dlscord-nltro',
	'http://cutt.us/dlscord-nltro',
];

async function listPhishingDomains() {
	let scamDomains = await stopPhishing.listDomains();
	let susDomains = await stopPhishing.listSuspicious();

	const uniqueDomains = [...new Set([...scamDomains, ...susDomains])];

	const checkedDomains = findAndReplace(uniqueDomains);
	checkedDomains.push(...missingFromSource);
	checkedDomains.sort();

	let fmt = {
		private: true,
		words: checkedDomains,
	};
	fs.writeFileSync('scam-domains.json', JSON.stringify(fmt, null, 4));
}

function findAndReplace(domains) {
	let list = domains;
	for (const replacement of filteredWordreplacements) {
		if (list.includes(replacement.word)) {
			let index = list.indexOf(replacement.word);
			list.splice(index, 1);
			list.push(...replacement.replacement);
		}
	}
	return list.sort();
}

listPhishingDomains();
