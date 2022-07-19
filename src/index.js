require("dotenv").config();
const { default: axios } = require('axios');
//
const {
  discordTexts, replaceToMemberUserTag
} = require('../discord-variables-texts');

const { 
  MessageButton, 
  MessageActionRow, 
  Modal, 
  TextInputComponent,
  Client,
  Intents,
} = require('discord.js');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});

const channelId = process.env.DISCORD_CHANNEL_ID;

async function loadVerifyEmailButton(member, channelIdParam) {
  const channel = client.channels.cache.get(channelIdParam || channelId);
  const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('primary')
        .setLabel(replaceToMemberUserTag(discordTexts.channel.verifyEmailButton.label))
        .setStyle('PRIMARY'),
    );

  channel.send({ 
    content: replaceToMemberUserTag(discordTexts.channel.welcome.text, member),
    components: [row] 
  });
}

async function handleButtonInteraction(interaction) {
  const user = interaction.member.user;

  const emailInputLabel = replaceToMemberUserTag(discordTexts.channel.modal.emailInputLabel, user);
  const modalTitle = replaceToMemberUserTag(discordTexts.channel.modal.title, user);

  const modal = new Modal()
  .setCustomId('validateEmailId')
  .setTitle(modalTitle);

  const emailInput = new TextInputComponent()
    .setCustomId('emailInput')
    .setLabel(emailInputLabel) 
    .setStyle('SHORT')
    .setMaxLength(100);

  const emailActionRow = new MessageActionRow().addComponents(emailInput);

  modal.addComponents(emailActionRow);

  await interaction.showModal(modal);
}

async function verifyIfEmailIsValid(interaction) {
  const userEmail = await interaction.fields.getTextInputValue('emailInput');

  const emailRegex = /\S+@\S+.\S+/;

  const user = interaction.member.user;

  if(!emailRegex.test(userEmail)) {
    interaction.reply({ 
      content: replaceToMemberUserTag(discordTexts.emailFormatedNotValidError, user), 
      ephemeral: true 
    });

    return false;
  }

  return userEmail;
}

function botApp() {
  client.on('guildMemberAdd', (member) => {
    loadVerifyEmailButton(member);
  });

  client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
      return handleButtonInteraction(interaction);
    };

    const member = interaction.member.user;

    const emailInformed = await verifyIfEmailIsValid(interaction);

    if(emailInformed) {
      const webhookResponse = await axios.post(process.env.MAKE_WEBHOOK_URL, {
        email: emailInformed,
        member
      });
      
      const result = webhookResponse.data;
      
      if(result.status) {
        const status = result.status.toLowerCase();

        if(status === 'success') {
          await interaction.reply({ 
            content: replaceToMemberUserTag(discordTexts.webHook.success, member),
            ephemeral: true,
          });
        }
        
        if(status === 'error') {
          await interaction.reply({ 
            content: replaceToMemberUserTag(discordTexts.webHook.error, member),
            ephemeral: true,
          });
        }

        return;
      }

      await interaction.reply({ 
        content: replaceToMemberUserTag(discordTexts.webHook.notFoundStatus, member),
        ephemeral: true,
      });
      return null;
    }

    return null;
  });

  const log = `[Log]: At [${new Date()}] Discord Bot server started.`
  console.log(log);

  client.login(process.env.DISCORD_BOT_TOKEN);
}

botApp();