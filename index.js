const stopPhishing = require('stop-discord-phishing');
const fs = require('fs');

async function listPhishingDomains() {
  let domains = await stopPhishing.listDomains();
  let fmt = {
    private: true,
    words: domains,
  };
  fs.writeFileSync('scam-domains.json', JSON.stringify(fmt));
}

async function listSuspiciousDomains() {
  let domains = await stopPhishing.listSuspicious();

  let fmt = {
    private: true,
    words: domains,
  };
  fs.writeFileSync('suspicious-domains.json', JSON.stringify(fmt));
}

listPhishingDomains();
listSuspiciousDomains();
