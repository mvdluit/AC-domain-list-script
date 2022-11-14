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
      'https://mmunity.com',
      'http://mmunity.com',
    ],
  },
  {
    word: 'steamcommunity.co',
    replacement: [
      'https://steamcommunity.co',
      'http://steamcommunity.co',
      'https://steamcommunity.co',
      'http://steamcommunity.co',
    ],
  },
];

async function listPhishingDomains() {
  let scamDomains = await stopPhishing.listDomains();
  let susDomains = await stopPhishing.listSuspicious();

  const uniqueDomains = [...new Set([...scamDomains, ...susDomains])];

  const checkedDomains = findAndReplace(uniqueDomains);

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
