# Scam domains update script for Angular Community discord

Fetches the latest lists from https://github.com/nikolaischunk/discord-phishing-links, formats the data to be ready to read by the discord bot and saves the lists to two json files.

## How to use

- `git clone` the project.
- `npm install` the dependencies.
- `npm run start` to fetch and save the latest domain lists update.

## Upload to the discord bot

_moderator role or above is required to perform these actions_

There is currently one list: `scams` which contains both confirmed phishing domains and suspicious domains.

**scam domains**

- Select `upload file`.
- Pick `scam-domains.json`.
- As accompanying text enter the update command: `g!wordlist update scams`.
