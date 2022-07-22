// Use {{user}} para que no código substitua este valor pelo @usuario#tag
// exemplo:
// variavel: `{{user}}, bem vindo ao servidor!`
// resultado: @tiaguin061#2748, bem vindo ao servidor!

const discordTexts = {
  server: {
    leave: {
      button: {
        label: 'Sair do servidor'
      },

      webhook: {
        error: {
          text: '{{user}}, algum erro ocorreu ao você tentar sair do servidor. Tente novamente!'
        },
        success: {
          text: '{{user}}, você será removido do servidor em instantes.'
        },
        transactionError: {
          text: '{{user}}, id do hotmart incorreto'
        }
      },
      
      // Quando clicar no botão sair
      modal: {
        title: "Digite o hotmart",
        leaveInputLabel: "Digite o código hotmart",
      },

      notFoundValue: {
        text: '{{user}}, digite um valor no input.'
      }
    },
    commands: {
      sair: {
        commandName: 'sair',
        description: 'Ao executar este comando, você será removido do servidor.'
      }
    },
  },
  channel: {
    verifyEmailButton: {
      label: "Liberar meu acesso."
    },

    // A mensagem junto com o botão na hora que o usuário entra no servidor
    welcome: {
      text: `
        Seja bem vindo à Comunidade de Automação, aperte no botão abaixo para verificar seu e-mail e liberar seu acesso.
      `
    },

    // aquele popup para perguntar o e-mail
    modal: {
      title: "Validação de e-mail",
      emailInputLabel: "Digite seu e-mail de compra da hotmart",
    },
  },
  
  emailFormatedNotValidError: `{{user}}, digite um formato de e-mail válido.`,

  // No consumo do webhook da integromat
  webHook: {
    redirectAfterSuccess: {
      // channel id = 999627060047777842
      // server id = 999627063625527370
      // https://discord.com/channels/CHANNEL_ID/SERVER_ID
      button: {
        label: 'Canal de Boas vindas',
        link: 'https://discord.com/channels/999627060047777842/999627063625527370'
      }
    },

    success: "{{user}}, seu e-mail foi validado com sucesso.",

    emailExist: "{{user}}, este usuário já está no Discord, caso queira trocar de usuário digite o comando /sair ou aperte no botão abaixo.",

    error: {
      buttons: {
        verifyEmailAgain: {
          label: "Verificar novamente"
        },
        talkToSuport: {
          label: "Falar com o suporte",
          link: "https://discord.com"
        }
      },
      text: "{{user}}, e-mail não encontrado, tente novamente ou entre em contato com o suporte."
    },
    notFoundStatus: "{{user}}, algum erro ocorreu. Entre em contato com o suporte."
  },
}

function replaceToMemberUserTag(text, user) {
  return text.replace(/{{user}}/g, user);
}

module.exports = {
  discordTexts,
  replaceToMemberUserTag
}
