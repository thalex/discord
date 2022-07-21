require("dotenv").config();
const { default: axios } = require('axios');

const {
  discordTexts, replaceToMemberUserTag
} = require('../discord-variables-texts');
const express = require("express");

const { 
  MessageButton, 
  MessageActionRow, 
  Modal, 
  TextInputComponent,
  Client,
  Intents,
} = require('discord.js');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_MESSAGES,
  ]
});

const channelId = process.env.DISCORD_CHANNEL_ID;

async function loadVerifyEmailButton(member, channelIdParam) {
  const channel = client.channels.cache.get(channelIdParam || channelId);

  const openModalBtn = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('openModalBtn')
        .setLabel(replaceToMemberUserTag(discordTexts.channel.verifyEmailButton.label))
        .setStyle('PRIMARY'),
    );

  await channel.send({ 
    content: member ? replaceToMemberUserTag(discordTexts.channel.welcome.text, member) : discordTexts.channel.welcome.text,
    components: [openModalBtn] 
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

async function sendToValidateEmailFromMakeWebhook({data, interaction, command}) {
  const member = interaction.member.user;

  const webhookResponse = await axios.post(process.env.MAKE_WEBHOOK_URL, {
    ...data,
    command,
  });
  
  const result = webhookResponse.data;

  if(result.status) {
    const status = result.status.toLowerCase();

    if(status === 'success') {
      await interaction.reply({ 
        content: replaceToMemberUserTag(discordTexts.webHook.success, member),
        ephemeral: true,
      });

      return null;
    }

    if(status === 'id-exist') {
      await interaction.reply({ 
        content: replaceToMemberUserTag(discordTexts.webHook.emailExist, member),
        ephemeral: true,
      });

      return null;
    }
  
    if(status === 'error') {
      const buttons = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('verifyEmailBtn')
            .setLabel(replaceToMemberUserTag(discordTexts.webHook.error.buttons.verifyEmailAgain.label, member))
            .setStyle('PRIMARY'),
          new MessageButton()
            .setLabel(replaceToMemberUserTag(discordTexts.webHook.error.buttons.talkToSuport.label, member))
            .setStyle('LINK')
            .setURL(replaceToMemberUserTag(discordTexts.webHook.error.buttons.talkToSuport.link, member))
        );

      await interaction.reply({ 
        content: replaceToMemberUserTag(discordTexts.webHook.error.text, member),
        ephemeral: true,
        components: [buttons],
      });

      return null;
    }
  }
  
  await interaction.reply({ 
    content: replaceToMemberUserTag(discordTexts.webHook.notFoundStatus, member),
    ephemeral: true,
  });
    
  return null;
}

async function discordServerLeaveMakeWebhook({data, interaction, command}) {
  const member = interaction.member.user;

  const webhookResponse = await axios.post(process.env.MAKE_WEBHOOK_URL, {
    ...data,
    command,
  });
  
  const result = webhookResponse.data;

  if(result.status) {
    const status = result.status.toLowerCase();

    if(status === 'error') {
      await interaction.reply({ 
        content: replaceToMemberUserTag(discordTexts.server.leave.webhook.error.text, member),
        ephemeral: true,
      });
    }
 
    return {
      status: result.status
    };
  }
    
  await interaction.reply({ 
    content: replaceToMemberUserTag(discordTexts.webHook.notFoundStatus, member),
    ephemeral: true,
  });

  return null;
}

client.on('messageCreate', async (message) => {
  const channelId = message.channel.id;

  if(message.content === '/load-verify-email-button') {
    loadVerifyEmailButton(null, channelId);

    if(message.deletable) {
      message.delete();
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  const member = interaction.member;
  const username = member.user.username;
  const discriminator = member.user.discriminator;
  const tag = `${username}#${discriminator}`;

  if (interaction.customId === 'openModalBtn') {
    return handleButtonInteraction(interaction);
  };

  if(interaction.isModalSubmit() && interaction.customId === 'validateEmailId') {
    const emailInformed = await verifyIfEmailIsValid(interaction);

    if(emailInformed) {
      await sendToValidateEmailFromMakeWebhook({
        data: {
          email: emailInformed,
          member: {
            ...member,
            user: {
              ...member.user,
              tag,
            }
          },
          command: null
        },
        interaction,
        command: null,
      });
    }

    return null;
  }

  if(interaction.isButton() && interaction.customId === 'confirmDiscordServerExit') {
    await discordServerLeaveMakeWebhook({
      data: {
        email: null,
        member: {
          ...member,
          user: {
            ...member.user,
            tag,
          }
        },
        command: interaction.commandName
      }, 
      interaction,
      command: `/${discordTexts.server.commands.sair.commandName}`
    });

    return null;
  }

  // commands
  if(interaction.isCommand()) {
    if(interaction.commandName === discordTexts.server.commands.sair.commandName) {
      const confirmDiscordServerExit = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('confirmDiscordServerExit')
          .setLabel(replaceToMemberUserTag(discordTexts.server.leave.button.label))
          .setStyle('PRIMARY'),
      );
      
      await interaction.reply({
        content: `${interaction.member.user}, deseja mesmo sair do servidor? Clique no botão para sair.`,
        components: [confirmDiscordServerExit],
        ephemeral: true
      });
    }
  };
});

const log = `[Log]: At [${new Date()}] Discord Bot server started.`
const app = express();
const port = 1323;

async function loadApp() {
  await client.login(process.env.DISCORD_BOT_TOKEN);
  
  app.listen(port, () => console.log(`${log} on port: ${port}`));
}

loadApp();