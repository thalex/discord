// Use {{user}} para que no código substitua este valor pelo @usuario#tag
// exemplo:
// variavel: `{{user}}, bem vindo ao servidor!`
// resultado: @tiaguin061#2748, bem vindo ao servidor!

const discordTexts = {
  channel: {
    verifyEmailButton: {
      label: "Verificar e-mail"
    },

    // A mensagem junto com o botão na hora que o usuário entra no servidor
    welcome: {
      text: `
        {{user}}, seja bem vindo.
      `
    },

    // aquele poupt para perguntar o e-mail
    modal: {
      title: "Validação de e-mail",
      emailInputLabel: "Qual é o seu e-mail?",
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
      text: "{{user}}, seu e-mail provalvemente não existe no google sheet"
    },
    notFoundStatus: "{{user}}, algum erro ocorreu. Talvez o integromat fora do ar. Volte mais tarde"
  },
}

function replaceToMemberUserTag(text, user) {
  return text.replace(/{{user}}/g, user);
}

module.exports = {
  discordTexts,
  replaceToMemberUserTag
}