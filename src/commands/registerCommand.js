require("dotenv").config();

const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9');

const rest = new REST({ 
  version: '9',
}).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => { 
  await rest.put(
    Routes.applicationCommands(
      process.env.DISCORD_BOT_CLIENT_ID
    ),
    { 
      body: [] 
    },
  )
})();
  