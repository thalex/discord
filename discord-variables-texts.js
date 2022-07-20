// Use {{user}} para que no código substitua este valor pelo @usuario#tag
// exemplo:
// variavel: `{{user}}, bem vindo ao servidor!`
// resultado: @tiaguin061#2748, bem vindo ao servidor!

const discordTexts = {
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

    // aquele poupt para perguntar o e-mail
    modal: {
      title: "Validação de e-mail",
      emailInputLabel: "Digite seu e-mail de compra da hotmart",
    },
  },
  
  emailFormatedNotValidError: `{{user}}, digite um formato de e-mail válido.`,

  // No consumo do webhook da integromat
  webHook: {
    success: "{{user}}, seu e-mail foi validado com sucesso.",
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
