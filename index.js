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
  for (const replacement of filteredWordreplacements) {
    if (domains.includes(replacement.word)) {
      let index = domains.indexOf(replacement.word);
      domains.splice(index, 1);
      domains.push(...replacement.replacement);
      return domains.sort();
    } else {
      return domains;
    }
  }
}

listPhishingDomains();
