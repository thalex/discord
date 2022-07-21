require("dotenv").config();

const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9');
const { discordTexts } = require('../../discord-variables-texts');

const rest = new REST({ 
  version: '9',
}).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => { 
  await rest.put(
    Routes.applicationCommands(
      process.env.DISCORD_BOT_ID
    ),
    { 
      body: [
        {
          name: discordTexts.server.commands.sair.commandName,
          description: discordTexts.server.commands.sair.description,
        }
      ] 
    },
  )
})();
  