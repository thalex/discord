// Use {{user}} para que no código substitua este valor pelo @usuario#tag
// exemplo:
// variavel: `{{user}}, bem vindo ao servidor!`

const discordTexts = {
  channel: {
    verifyEmailButton: {
      label: "Verificar e-mail"
    },

    initialMessage: `
    [ambiente dev]{{user}}, Bem vindo! Para dar continuidade no servidor, precisamos que você verifique seu e-mail. Ao clicar no botão, abrirá um Modal para preencher o e-mail.
    `,

    modal: {
      title: "Validação de e-mail",
      emailInputLabel: "Qual é o seu e-mail?",
    },
  },
  
  emailFormatedNotValidError: `{{user}}, digite um formato de e-mail válido.`,

  webHook: {
    success: "{{user}}, seu e-mail foi validado com sucesso.",
    error: "{{user}}, algum erro aconteceu. Tente novamente!"
  },

  welcome: {
    text: `
      {{user}}, seja bem vindo.
    `
  }
}

function replaceToMemberUserTag(text, user) {
  return text.replace(/{{user}}/g, user);
}

module.exports = {
  discordTexts,
  replaceToMemberUserTag
}