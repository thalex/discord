// Use {{user}} para que no código substitua este valor pelo @usuario#tag
// exemplo:
// variavel: `{{user}}, bem vindo ao servidor!`
// resultado: @thales#1234, bem vindo ao servidor!

// 8.1 - Sair do Servidor
const discordTexts = {
  server: {
    leave: {
      text: '{{user}}, deseja mesmo sair do servidor? Aperte no botão abaixo para sair.',

      button: {
        label: 'SAIR DO SERVIDOR'
      },
      webhook: {
        error: {
          text: '{{user}}, ocorreu um erro sinistro ao você tentar sair do servidor, entre em contato com o suporte.',
          buttons: {
            talkToSuport: {
              label: "FALAR COM O SUPORTE",
              link: "https://api.whatsapp.com/send?phone=+12793001001&text=preciso%20de%20ajuda%20com%20o%20Discord!"
            }
          },
        },
        success: {
          text: '{{user}}, você será removido do servidor em instantes.'
        },
        transactionError: {
          text: '{{user}}, id do hotmart incorreto',
          buttons: {
            verifyEmailAgain: {
              label: "VERIFICAR NOVAMENTE"
            },
            talkToSuport: {
              label: "FALAR COM O SUPORTE",
              link: "https://api.whatsapp.com/send?phone=+12793001001&text=preciso%20de%20ajuda%20com%20o%20Discord!"
            }
          },
        }
      },
      
      // 6.1 - Quando clicar no botão sair
      modal: {
        title: "VERIFICAÇÃO",
        leaveInputLabel: "Digite o código de transação da Hotmart 👇",
      },

      notFoundValue: {
        text: '{{user}}, digite um valor no input.'
      },

      notFoundStatus: {
        buttons: {
          verifyEmailAgain: {
            label: 'TENTAR NOVAMENTE'
          }
        }
      }
    },
    commands: {
      sair: {
        commandName: 'sair',
        description: 'Ao executar este comando, você será removido do servidor.'
      }
    },
  },
  // 1.2 - Botão de liberação do acesso após entrar no servidor.
  channel: {
    verifyEmailButton: {
      label: "LIBERAR MEU ACESSO"
    },

    // 1.1 - Entra no servidor, aperta no botão para liberar o acesso e digita o e-mail para confirmar sua entrada.
    welcome: {
      text: `Seja muito bem-vindo(a) à Comunidade de Automação, aperte no botão abaixo para confirmar seu e-mail e liberar seu acesso.`
    },

    // 2.1 - Popup para perguntar o e-mail
    modal: {
      title: "VERIFICAÇÃO",
      emailInputLabel: "Digite seu e-mail de compra da hotmart 👇",
    },
  },
  // 3.5 - Caso digite o e-mail em um formato inválido
  emailFormatedNotValidError: {
    text: `{{user}}, esse e-mail não é valido, aperte no botão abaixo para tentar novamente.`,
    buttons: {
      verifyEmailAgain: {
        label: "TENTAR NOVAMENTE"
      },
      talkToSuport: {
        label: "FALAR COM O SUPORTE",
        link: "https://api.whatsapp.com/send?phone=+12793001001&text=preciso%20de%20ajuda%20com%20o%20Discord!"
      }
    },
  },

  // No consumo do webhook da integromat
  webHook: {
    redirectAfterSuccess: {
      // channel id = 999627060047777842
      // server id = 999627063625527370
      // https://discord.com/channels/CHANNEL_ID/SERVER_ID
      // 3.2
      button: {
        label: 'CANAL DE BOAS-VINDAS',
        link: 'https://ptb.discord.com/channels/952631809269727292/952631809269727295'
      }
    },
    // 3.1 - Digitou o e-mail corretamente e o acesso foi liberado
    success: {
      text: "{{user}}, acesso liberado! Aperte no botão abaixo para ir pro canal de boas-vindas.",
    },
    // 5.1 - Se o aluno já tiver no servidor, ele vai pedir o número de transação da hotmart para confirmação.
    emailExist: {
      text: "{{user}}, já existe uma conta com esse e-mail dentro da comunidade no Discord, aperte no botão abaixo para removê-lo e depois entre novamente através do link de convite.",
      button: {
        label: 'REMOVER ACESSO'
      },
    },
    
    // 4.1
    error: {
      text: "{{user}}, e-mail não encontrado, tente novamente ou entre em contato com o suporte.",
      
      buttons: {
        verifyEmailAgain: {
          label: "TENTAR NOVAMENTE"
        },
        talkToSuport: {
          label: "FALAR COM O SUPORTE",
          link: "https://api.whatsapp.com/send?phone=+12793001001&text=preciso%20de%20ajuda%20com%20o%20Discord!"
        }
      },
    },
    // 7.1 - Número de transação da hotmart inválido..
    notFoundStatus: {
      text: "{{user}}, código de transação inválido, tente novamente ou entre em contato com o suporte.",
      buttons: {
        talkToSuport: {
          label: "FALAR COM O SUPORTE",
          link: "https://api.whatsapp.com/send?phone=+12793001001&text=preciso%20de%20ajuda%20com%20o%20Discord!"
        }
      },
    }
  },
}

function replaceToMemberUserTag(text, user) {
  return text.replace(/{{user}}/g, user);
}

module.exports = {
  discordTexts,
  replaceToMemberUserTag
}
