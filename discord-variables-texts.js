// Use {{user}} para que no código substitua este valor pelo @usuario#tag
// exemplo:
// variavel: `{{user}}, bem vindo ao servidor!`
// resultado: @tiaguin061#2748, bem vindo ao servidor!

const discordTexts = {
  server: {
    leave: {
      button: {
        label: 'SAIR DO SERVIDOR'
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
        title: "HOTMART ID",
        leaveInputLabel: "Digite o número da transação da Hotmart 👇",
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
      label: "LIBERAR MEU ACESSO"
    },

    // A mensagem junto com o botão na hora que o usuário entra no servidor
    welcome: {
      text: `
        Seja bem vindo à Comunidade de Automação, aperte no botão abaixo para verificar seu e-mail e liberar seu acesso.
      `
    },

    // aquele popup para perguntar o e-mail
    modal: {
      title: "VALIDAÇÃO DE E-MAIL",
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
        label: 'CANAL DE BOAS-VINDAS',
        link: 'https://discord.com/channels/999627060047777842/999627063625527370'
      }
    },

    success: "{{user}}, acesso liberado, aperte no botão abaixo para ir pro canal de boas-vindas.",

    emailExist: "{{user}}, este aluno já está no Discord, aperte no botão abaixo para removê-lo e depois entre novamente",

    error: {
      buttons: {
        verifyEmailAgain: {
          label: "VERIFICAR NOVAMENTE"
        },
        talkToSuport: {
          label: "FALAR COM O SUPORTE",
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
