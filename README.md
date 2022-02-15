# Scam domains update script for Angular Community discord

fetches the latest lists from https://github.com/nikolaischunk/discord-phishing-links, formats the data to be ready to read by the discord bot and saves the lists to two json files.

## How to use

- `git clone` the project.
- `npm install` the dependencies.
- `npm run start` to fetch and save the latest domain lists update.

## Upload to the discord bot

_moderator role or above is required to perform these actions_

There are currently two lists: `scams` which contain confirmed phishing domains and `suspicious-domain-list` which contain suspicious domains.

**scam domains**

- select `upload file`.
- pick `scam-domains.json`
- as accompanying text enter the update command: `g!wordlist update scams`

**suspicious domains**

- select `upload file`.
- pick `suspicious-domains.json`
- as accompanying text enter the update command: `g!wordlist update suspicious-domain-list`
