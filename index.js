const stopPhishing = require('stop-discord-phishing');
const fs = require('fs');

const witchtv = {
  word: 'witch.tv',
  replaceWith: [
    'http://witch.tv',
    'https://witch.tv',
    'http://www.witch.tv',
    'https://witch.tv',
  ],
};

async function listPhishingDomains() {
  let domains = await stopPhishing.listDomains();

  const checkedDomains = findAndReplace(domains, witchtv);

  let fmt = {
    private: true,
    words: checkedDomains,
  };
  fs.writeFileSync('scam-domains.json', JSON.stringify(fmt, null, 4));
}

async function listSuspiciousDomains() {
  let domains = await stopPhishing.listSuspicious();

  const checkedDomains = findAndReplace(domains, witchtv);

  let fmt = {
    private: true,
    words: checkedDomains,
  };
  fs.writeFileSync('suspicious-domains.json', JSON.stringify(fmt, null, 4));
}

function findAndReplace(domains, options) {
  if (domains.includes(options.word)) {
    let index = domains.indexOf(options.word);
    domains.splice(index, 1);
    domains.push(...options.replaceWith);
    return domains.sort();
  } else {
    return domains;
  }
}

listPhishingDomains();
listSuspiciousDomains();
