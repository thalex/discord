require("dotenv").config();
const { default: axios } = require('axios');

const {
  discordTexts, replaceToMemberUserTag
} = require('../discord-variables-texts');

const { 
  ButtonBuilder, 
  ActionRowBuilder, 
  ModalBuilder, 
  TextInputBuilder,
  Client,
  GatewayIntentBits,
  InteractionType
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ]
});

/*
* Primary = 1,
  Secondary = 2,
  Success = 3,
  Danger = 4,
  Link = 5
*/

const channelId = process.env.DISCORD_CHANNEL_ID;

async function loadVerifyEmailButton(member, channelIdParam) {
  const channel = client.channels.cache.get(channelIdParam || channelId);

  const openModalBuilderBtn = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('openModalBuilderBtn')
        .setLabel(replaceToMemberUserTag(discordTexts.channel.verifyEmailButton.label))
        .setStyle(3),
    );

  await channel.send({ 
    content: member ? replaceToMemberUserTag(discordTexts.channel.welcome.text, member) : discordTexts.channel.welcome.text,
    components: [openModalBuilderBtn] 
  });
}

async function handleButtonInteraction(interaction) {
  const user = interaction.member.user;

  const emailInputLabel = replaceToMemberUserTag(discordTexts.channel.modal.emailInputLabel, user);
  const modalTitle = replaceToMemberUserTag(discordTexts.channel.modal.title, user);

  const modal = new ModalBuilder()
    .setCustomId('validateEmailId')
    .setTitle(modalTitle);

  const emailInput = new TextInputBuilder()
    .setCustomId('emailInput')
    .setLabel(emailInputLabel) 
    .setStyle(1)
    .setMaxLength(100);

  const emailActionRow = new ActionRowBuilder().addComponents(emailInput);

  modal.addComponents(emailActionRow);

  await interaction.showModal(modal);
}

async function verifyIfEmailIsValid(interaction) {
  const userEmail = await interaction.fields.getTextInputValue('emailInput');

  const emailRegex = /\S+@\S+.\S+/;

  const member = interaction.member.user;

  if(!emailRegex.test(userEmail)) {
    const supportBtnMessage = new ButtonBuilder()
      .setLabel(replaceToMemberUserTag(discordTexts.emailFormatedNotValidError.buttons.talkToSuport.label, member))
      .setStyle(5)
      .setURL(replaceToMemberUserTag(discordTexts.emailFormatedNotValidError.buttons.talkToSuport.link, member))

    const buttons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('openModalBuilderBtn')
          .setLabel(replaceToMemberUserTag(discordTexts.emailFormatedNotValidError.buttons.verifyEmailAgain.label, member))
          .setStyle(1),
        supportBtnMessage
      );

    await interaction.reply({ 
      content: replaceToMemberUserTag(discordTexts.emailFormatedNotValidError.text, member), 
      ephemeral: true,
      components: [buttons] 
    });

    return false;
  }

  return userEmail;
}

async function sendToValidateEmailFromMakeWebhook({data, interaction, command}) {
  const member = interaction.member.user;

  const supportBtnMessage = new ButtonBuilder()
    .setLabel(replaceToMemberUserTag(discordTexts.webHook.error.buttons.talkToSuport.label, member))
    .setStyle(5)
    .setURL(replaceToMemberUserTag(discordTexts.webHook.error.buttons.talkToSuport.link, member))

  const rowMessage = new ActionRowBuilder().addComponents(supportBtnMessage);

  try {
    const webhookResponse = await axios.post(process.env.MAKE_WEBHOOK_URL, {
      ...data,
      command,
    });

    const result = webhookResponse.data;
  
    if(result.status) {
      const status = result.status.toLowerCase();
  
      if(status === 'success') {
        const goToOtherChannel = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setLabel(replaceToMemberUserTag(discordTexts.webHook.redirectAfterSuccess.button.label, member))
            .setStyle(5)
            .setURL(replaceToMemberUserTag(discordTexts.webHook.redirectAfterSuccess.button.link, member))
          );

        await interaction.reply({ 
          content: replaceToMemberUserTag(discordTexts.webHook.success.text, member),
          ephemeral: true,
          components: [goToOtherChannel]
        });
      }
  
      if(status === 'id-exist') {
        const confirmDiscordServerExit = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('confirmDiscordServerExit')
              .setLabel(replaceToMemberUserTag(discordTexts.webHook.emailExist.button.label))
              .setStyle(4),
          );

        await interaction.reply({ 
          content: replaceToMemberUserTag(discordTexts.webHook.emailExist.text, member),
          ephemeral: true,
          components: [confirmDiscordServerExit]
        });
      }
    
      if(status === 'error') {
        const buttons = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('openModalBuilderBtn')
              .setLabel(replaceToMemberUserTag(discordTexts.webHook.error.buttons.verifyEmailAgain.label, member))
              .setStyle(1),
            supportBtnMessage
          );
  
        await interaction.reply({ 
          content: replaceToMemberUserTag(discordTexts.webHook.error.text, member),
          ephemeral: true,
          components: [buttons],
        });
      }
      return null;
    }
    
    await interaction.reply({ 
      content: replaceToMemberUserTag(discordTexts.webHook.notFoundStatus.text, member),
      ephemeral: true,
      components: [rowMessage]
    });
    
    return null;
  } catch (error) {
    await interaction.reply({ 
      content: replaceToMemberUserTag(discordTexts.webHook.notFoundStatus.text, member),
      ephemeral: true,
      components: [rowMessage]
    });
  }

  return null;
}

async function verifyLeaveInput(interaction) {
  const leaveValue = await interaction.fields.getTextInputValue('leaveInput');

  const member = interaction.member.user;

  if(!leaveValue) {
    await interaction.reply({ 
      content: replaceToMemberUserTag(discordTexts.server.leave.notFoundValue.text, member),
      ephemeral: true,
    });

    return false;
  }

  return leaveValue;
}

async function openLeaveModalBuilder(interaction) {
  const member = interaction.member.user;
  
  const leaveModalBuilderInputLabel = replaceToMemberUserTag(discordTexts.server.leave.modal.leaveInputLabel, member);
  const modalTitle = replaceToMemberUserTag(discordTexts.server.leave.modal.title, member);

  const modal = new ModalBuilder()
    .setCustomId('leaveModalBuilderId')
    .setTitle(modalTitle);

  const leaveInput = new TextInputBuilder()
    .setCustomId('leaveInput')
    .setLabel(leaveModalBuilderInputLabel) 
    .setStyle(1)
    .setMaxLength(100);

  const leaveActionRow = new ActionRowBuilder().addComponents(leaveInput);

  modal.addComponents(leaveActionRow);

  return interaction.showModal(modal);
}

async function discordServerLeaveMakeWebhook({data, interaction, command}) {
  const member = interaction.member.user;

  const rowMessage = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setStyle(1)
        .setCustomId('confirmDiscordServerExit')
        .setLabel(
          replaceToMemberUserTag(
            discordTexts.server.leave.notFoundStatus.buttons.verifyEmailAgain.label, 
            member
          )
        ),
      new ButtonBuilder()
        .setLabel(replaceToMemberUserTag(discordTexts.webHook.error.buttons.talkToSuport.label, member))
        .setStyle(5)
        .setURL(replaceToMemberUserTag(discordTexts.webHook.error.buttons.talkToSuport.link, member)),
  );

  try {
    const webhookResponse = await axios.post(process.env.MAKE_WEBHOOK_URL, {
      ...data,
      command,
    });
    
    const result = webhookResponse.data;

    if(result.status) {
      const status = result.status.toLowerCase();

      if(status === 'success') {
        await interaction.reply({ 
          content: replaceToMemberUserTag(discordTexts.server.leave.webhook.success.text, member),
          ephemeral: true,
        });
      }

      if(status === 'error') {
        const rowMessage = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setLabel(replaceToMemberUserTag(discordTexts.webHook.error.buttons.talkToSuport.label, member))
              .setStyle(5)
              .setURL(replaceToMemberUserTag(discordTexts.webHook.error.buttons.talkToSuport.link, member)),
        );
        
        await interaction.reply({ 
          content: replaceToMemberUserTag(discordTexts.server.leave.webhook.error.text, member),
          ephemeral: true,
          components: [rowMessage]
        });
      }

      if(status === 'leave-transaction-error') {  
        const rowMessage = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('confirmDiscordServerExit')
              .setLabel(
                replaceToMemberUserTag(
                  discordTexts.server.leave.webhook.transactionError.buttons.verifyEmailAgain.label, 
                  member
                  )
                )
              .setStyle(1),
            new ButtonBuilder()
              .setLabel(
                replaceToMemberUserTag(
                  discordTexts.server.leave.webhook.transactionError.buttons.verifyEmailAgain.label, 
                  member
                )
              )
              .setStyle(5)
              .setURL(replaceToMemberUserTag(
                replaceToMemberUserTag(
                  discordTexts.server.leave.webhook.transactionError.buttons.talkToSuport.label, 
                  member
                )
              )),
        );

        await interaction.reply({ 
          content: replaceToMemberUserTag(discordTexts.server.leave.webhook.transactionError.text, member),
          ephemeral: true,
          components: [rowMessage]
        });
      }

      return {
        status: result.status
      };
    }

    await interaction.reply({ 
      content: replaceToMemberUserTag(discordTexts.webHook.notFoundStatus.text, member),
      ephemeral: true,
      components: [rowMessage]
    });
  } catch (error) {
    await interaction.reply({ 
      content: replaceToMemberUserTag(discordTexts.webHook.notFoundStatus.text, member),
      ephemeral: true,
      components: [rowMessage]
    });
  }
  
  return null;
}

client.on('messageCreate', async (message) => {
  const channelId = message.channel.id;

  if(message.content === '/load-verify-email-button') {
    await loadVerifyEmailButton(null, channelId);

    if(message.deletable) {
      message.delete();
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if(!interaction) {
    return null;
  }

  const member = interaction.member;
  let username = '';
  let discriminator = '';
  let tag = '';

  if(member) {
    username = member.user.username;
    discriminator = member.user.discriminator;
    tag = `${username}#${discriminator}`;
  }

  if (interaction.customId === 'openModalBuilderBtn') {
    return handleButtonInteraction(interaction);
  };
  
  if(interaction.type === InteractionType.ModalSubmit && interaction.customId === 'validateEmailId') {
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
          command: null,
          transactionId: null
        },
        interaction,
        command: null,
      });
    }

    return null;
  }

  if(interaction.isButton() && interaction.customId === 'confirmDiscordServerExit') {
    await openLeaveModalBuilder(interaction)

    return null;
  }

  if(interaction.type === InteractionType.ModalSubmit && interaction.customId === 'leaveModalBuilderId') {
    const leaveValue = await verifyLeaveInput(interaction);

    if(leaveValue) {
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
          command: null,
          transactionId: leaveValue
        },
        interaction,
        command: null,
      });
    }

    return null;
  }

  if(interaction.isButton() && interaction.customId === 'serverExitBtn') {
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
        command: null,
        transactionId: null
      },
      interaction,
      command: `/${discordTexts.server.commands.sair.commandName}`,
    });

    return null;
  }

  // commands
  if(interaction.type === InteractionType.ApplicationCommand) {
    if(interaction.commandName === discordTexts.server.commands.sair.commandName) {
      const serverExit = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('serverExitBtn')
          .setLabel(replaceToMemberUserTag(discordTexts.server.leave.button.label, member))
          .setStyle(4),
      );

      await interaction.reply({
        content: replaceToMemberUserTag(discordTexts.server.leave.text, member),
        components: [serverExit],
        ephemeral: true
      });
    }
  };
});

const log = `[Log]: At [${new Date()}] Discord Bot server started.`

client.login(process.env.DISCORD_BOT_TOKEN);
console.log(`${log}`);