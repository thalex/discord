require("dotenv").config();

// Use {{user}} para que no código substitua este valor pelo @usuario#tag
// exemplo:
// variavel: `{{user}}, bem vindo ao servidor!`
// resultado: @thales#1234, bem vindo ao servidor!

const discordTexts = {
  server: {
    // Variaveis 8;
    leave: {
      text: process.env._8_1_SAIR_SERVIDOR_VIA_COMANDO_TEXTO || '{{user}}, deseja mesmo sair do servidor? Aperte no botão abaixo para sair.',

      button: {
        label: process.env._8_2_SAIR_SERVIDOR_VIA_COMANDO_TEXTO_BOTAO || 'SAIR DO SERVIDOR'
      },
      webhook: {
        error: {
          text: process.env._8_3_SAIR_SERVIDOR_VIA_COMANDO_TEXTO_PADRAO_ERRO ||'{{user}}, ocorreu um erro sinistro ao você tentar sair do servidor, entre em contato com o suporte.',
          buttons: {
            talkToSuport: {
              label: process.env._8_4_SAIR_SERVIDOR_VIA_COMANDO_BOTAO_FALAR_SUPORTE || "FALAR COM O SUPORTE",
              link: process.env._8_5_SAIR_SERVIDOR_VIA_COMANDO_LINK_BOTAO_FALAR_SUPORTE || "https://api.whatsapp.com/send?phone=+12793001001&text=preciso%20de%20ajuda%20com%20o%20Discord!"
            }
          },
        },
        success: {
          text: '{{user}}, você será removido do servidor em instantes.'
        },
        transactionError: {
          text: process.env._7_1_VERIFICACAO_CODIGO_TRANSACAO_INVALIDO_TEXTO || '{{user}}, id do hotmart incorreto',
          buttons: {
            verifyEmailAgain: {
              label: process.env._7_2_VERIFICACAO_CODIGO_TRANSACAO_INVALIDO_BOTAO_TENTE_NOVAMENTE || "VERIFICAR NOVAMENTE"
            },
            talkToSuport: {
              label: process.env._7_3_VERIFICACAO_CODIGO_TRANSACAO_INVALIDO_BOTAO_FALAR_SUPORTE || "FALAR COM O SUPORTE",
              link: process.env._7_4_VERIFICACAO_CODIGO_TRANSACAO_INVALIDO_LINK_BOTAO_FALAR_SUPORTE || "https://api.whatsapp.com/send?phone=+12793001001&text=preciso%20de%20ajuda%20com%20o%20Discord!"
            }
          },
        }
      },
      
      // Variaveis 6; Quando clicar no botão sair
      modal: {
        title: process.env._6_1_VERIFICACAO_USUARIO_JA_EXISTE_TEXTOP || "VERIFICAÇÃO", 
        leaveInputLabel: process.env._6_2_VERIFICACAO_USUARIO_JA_EXISTE_TEXTO_POPUP || "Digite o código de transação da Hotmart 👇",
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
  channel: {
    // Variaveis 1;
    welcome: {
      text: process.env._1_1_BOAS_VINDAS_TEXTO || `Seja muito bem-vindo(a) à Comunidade de Automação, aperte no botão abaixo para confirmar seu e-mail e liberar seu acesso.`
    },
    verifyEmailButton: {
      label: process.env._1_2_BOAS_VINDAS_TEXTO_BOTAO || "LIBERAR MEU ACESSO"
    },

    // Variaveis 2;
    modal: {
      title: process.env._2_1_VERIFICACAO_INICIAL_TITULO_POPUP || "VERIFICAÇÃO",
      emailInputLabel: process.env._2_2_VERIFICACAO_INICIAL_TEXTO_POPUP || "Digite seu e-mail de compra da hotmart 👇",
    },
  },

  webHook: {
    // Variaveis 3 - parte 1;
    redirectAfterSuccess: {
      // CHANNEL_ID = 999627060047777842
      // SERVER_ID = 999627063625527370
      // https://discord.com/channels/CHANNEL_ID/SERVER_ID
      button: {
        label: process.env._3_2_VERIFICACAO_ACESSO_LIBERADO_TEXTO_BOTAO_CANAL_BOAS_VINDAS || 'CANAL DE BOAS-VINDAS',
        link: process.env._3_3_VERIFICACAO_ACESSO_LIBERADO_LINK_BOTAO_CANAL_BOAS_VINDAS || 'https://ptb.discord.com/channels/952631809269727292/952631809269727295'
      }
    },
    success: {
      text: process.env._3_1_VERIFICACAO_ACESSO_LIBERADO_TEXTO || "{{user}}, acesso liberado! Aperte no botão abaixo para ir pro canal de boas-vindas.",
    },

    // Variaveis 4;
    error: {
      text: process.env._4_1_EMAIL_NAO_ENCONTRADO_TEXTO || "{{user}}, e-mail não encontrado, tente novamente ou entre em contato com o suporte.",
      
      buttons: {
        verifyEmailAgain: {
          label: process.env._4_2_EMAIL_NAO_ENCONTRADO_BOTAO_TENTE_NOVAMENTE || "TENTAR NOVAMENTE"
        },
        talkToSuport: {
          label: process.env._4_3_EMAIL_NAO_ENCONTRADO_BOTAO_FALAR_SUPORTE || "FALAR COM O SUPORTE",
          link: process.env._4_4_EMAIL_NAO_ENCONTRADO_LINK_BOTAO_FALAR_SUPORTE ||  "https://api.whatsapp.com/send?phone=+12793001001&text=preciso%20de%20ajuda%20com%20o%20Discord!"
        }
      },
    },

    // Variaveis 5;
    emailExist: {
      text: process.env._5_1_USUARIO_JA_EXISTE_NO_SERVIDOR_TEXTO || "{{user}}, já existe uma conta com esse e-mail dentro da comunidade no Discord, aperte no botão abaixo para removê-lo e depois entre novamente através do link de convite.",
      button: {
        label: process.env._5_2_USUARIO_JA_EXISTE_NO_SERVIDOR_BOTAO_TEXTO || 'REMOVER ACESSO'
      },
    },
 
    // 7.1 - Número de transação da hotmart inválido..
    notFoundStatus: {
      text: process.env._7_1_VERIFICACAO_CODIGO_TRANSACAO_INVALIDO_TEXTO || "{{user}}, código de transação inválido, tente novamente ou entre em contato com o suporte.",
      buttons: {
        talkToSuport: {
          label: process.env._7_2_VERIFICACAO_CODIGO_TRANSACAO_INVALIDO_BOTAO_FALAR_SUPORTE || "FALAR COM O SUPORTE",
          link: process.env._7_3_VERIFICACAO_CODIGO_TRANSACAO_INVALIDO_LINK_BOTAO_FALAR_SUPORTE || "https://api.whatsapp.com/send?phone=+12793001001&text=preciso%20de%20ajuda%20com%20o%20Discord!"
        }
      },
    }
  },

  // Variaveis 3 - parte 2;
  emailFormatedNotValidError: {
    text: process.env._3_4_VERIFICACAO_FORMATO_EMAIL_INVALIDO_TEXTO || `{{user}}, esse e-mail não é valido, aperte no botão abaixo para tentar novamente.`,
    buttons: {
      verifyEmailAgain: {
        label: process.env._3_5_VERIFICACAO_FORMATO_EMAIL_INVALIDO_TEXTO_BOTAO_TENTE_NOVAMENTE || "TENTAR NOVAMENTE"
      },
      talkToSuport: {
        label: process.env._3_6_VERIFICACAO_FORMATO_EMAIL_INVALIDO_TEXTO_BOTAO_FALAR_SUPORTE || "FALAR COM O SUPORTE",
        link: process.env._3_7_VERIFICACAO_FORMATO_EMAIL_INVALIDO_LINK_BOTAO_FALAR_SUPORTE || "https://api.whatsapp.com/send?phone=+12793001001&text=preciso%20de%20ajuda%20com%20o%20Discord!"
      }
    },
  },
}

function replaceToMemberUserTag(text, user) {
  return text.replace(/{{user}}/g, user);
}

module.exports = {
  discordTexts,
  replaceToMemberUserTag
}
