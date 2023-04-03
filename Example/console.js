-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
conteúdo da mensagem  A
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
e os botão {
  msg: {
    key: {
      remoteJid: '5516993043158@s.whatsapp.net',
      fromMe: false,
      id: '2BBB654F2B3825F155CF5ED0CD84C434',
      participant: undefined
    },
    messageTimestamp: 1680292970,
    pushName: 'Ires',
    broadcast: false,
    message: Message {
      conversation: 'A',
      messageContextInfo: [MessageContextInfo]
    }
  }
}
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
outra coisa 5516993043158@s.whatsapp.net
-------------------------------------------------------------------------------------------- **** --------------------------------------------------------------------------------------------
[
  {
    id: '5516993043158@s.whatsapp.net',
    conversationTimestamp: 1680292970,
    unreadCount: 1
  }
]
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
recv messages  {
  "messages": [
    {
      "key": {
        "remoteJid": "5516993043158@s.whatsapp.net",
        "fromMe": true,
        "id": "BAE5A9CE56C8A5FB"
      },
      "message": {
        "buttonsMessage": {
          "contentText": "Clique no botão que contém a opção que você deseja.",
          "footerText": "Imobiliária Casa Nova",
          "buttons": [
            {
              "buttonId": "id1",
              "buttonText": {
                "displayText": "1-Aluguel de imóveis."
              },
              "type": "RESPONSE"
            },
            {
              "buttonId": "id2",
              "buttonText": {
                "displayText": "2-Compra de imóveis."
              },
              "type": "RESPONSE"
            },
            {
              "buttonId": "id3",
              "buttonText": {
                "displayText": "3-Venda de imóveis."
              },
              "type": "RESPONSE"
            },
            {
              "buttonId": "id4",
              "buttonText": {
                "displayText": "4-Encerrar atendimento."
              },
              "type": "RESPONSE"
            }
          ],
          "headerType": "EMPTY"
        }
      },
      "messageTimestamp": "1680292972",
      "status": "PENDING"
    }
  ],
  "type": "append"
}
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
[
  {
    id: '5516993043158@s.whatsapp.net',
    conversationTimestamp: 1680292972
  }
]
[
  {
    "key": {
      "remoteJid": "5516993043158@s.whatsapp.net",
      "id": "BAE573D37B8ADAE3",
      "fromMe": true
    },
    "update": {
      "status": 4
    }
  }
]
[
  {
    "key": {
      "remoteJid": "5516993043158@s.whatsapp.net",
      "id": "BAE5A9CE56C8A5FB",
      "fromMe": true
    },
    "update": {
      "status": 4
    }
  }
]
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
const upsert = events['messages.upsert']
console.log('recv messages ', JSON.stringify(upsert, undefined, 2))
recv messages  {
  "messages": [
    {
      "key": {
        "remoteJid": "5516993043158@s.whatsapp.net",
        "fromMe": false,
        "id": "63CEB219C7C65D454745C58E72BBB439"
      },
      "messageTimestamp": 1680292977,
      "pushName": "Ires",
      "broadcast": false,
      "message": {
        "messageContextInfo": {
          "deviceListMetadata": {
            "recipientKeyHash": "Kt9yLpQnq4017g==",
            "recipientTimestamp": "1680195835"
          },
          "deviceListMetadataVersion": 2
        },
        "buttonsResponseMessage": {
          "selectedButtonId": "id2",
          "selectedDisplayText": "2-Compra de imóveis.",
          "contextInfo": {
            "stanzaId": "BAE5A9CE56C8A5FB",
            "participant": "5516992150105@s.whatsapp.net",
            "quotedMessage": {
              "buttonsMessage": {
                "contentText": "Clique no botão que contém a opção que você deseja.",
                "footerText": "Imobiliária Casa Nova",
                "buttons": [
                  {
                    "buttonId": "id1",
                    "buttonText": {
                      "displayText": "1-Aluguel de imóveis."
                    },
                    "type": "RESPONSE"
                  },
                  {
                    "buttonId": "id2",
                    "buttonText": {
                      "displayText": "2-Compra de imóveis." //assign this to a variable
                    },
                    "type": "RESPONSE"
                  },
                  {
                    "buttonId": "id3",
                    "buttonText": {
                      "displayText": "3-Venda de imóveis."
                    },
                    "type": "RESPONSE"
                  },
                  {
                    "buttonId": "id4",
                    "buttonText": {
                      "displayText": "4-Encerrar atendimento."
                    },
                    "type": "RESPONSE"
                  }
                ],
                "headerType": "EMPTY"
              }
            }
          },
          "type": "DISPLAY_TEXT"
        }
      }
    }
  ],
  "type": "notify"
}
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
replying to 5516993043158@s.whatsapp.net
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
recv messages  {
  "messages": [
    {
      "key": {
        "remoteJid": "5516993043158@s.whatsapp.net",
        "fromMe": true,
        "id": "BAE52BD69CD21F2A"
      },
      "message": {
        "extendedTextMessage": {
          "text": "Olá a Imobiliária Casa Nova agradece o contato\nPara prosseguir com o atendimento envie uma das opções abaixo:"
        }
      },
      "messageTimestamp": "1680292979",
      "status": "PENDING"
    }
  ],
  "type": "append"
}
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
[
  {
    id: '5516993043158@s.whatsapp.net',
    conversationTimestamp: 1680292979
  }
]

-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
conteúdo da mensagem
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
e os botão {
  msg: {
    key: {
      remoteJid: '5516993043158@s.whatsapp.net',
      fromMe: false,
      id: '63CEB219C7C65D454745C58E72BBB439',
      participant: undefined
    },
    messageTimestamp: 1680292977,
    pushName: 'Ires',
    broadcast: false,
    message: Message {
      messageContextInfo: [MessageContextInfo],
      buttonsResponseMessage: [ButtonsResponseMessage]
    }
  }
}
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
outra coisa 5516993043158@s.whatsapp.net
-------------------------------------------------------------------------------------------- **** --------------------------------------------------------------------------------------------
[
  {
    id: '5516993043158@s.whatsapp.net',
    conversationTimestamp: 1680292977,
    unreadCount: 1
  }
]
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
recv messages  {
  "messages": [
    {
      "key": {
        "remoteJid": "5516993043158@s.whatsapp.net",
        "fromMe": true,
        "id": "BAE5BAE3ACB55070"
      },
      "message": {
        "buttonsMessage": {
          "contentText": "Clique no botão que contém a opção que você deseja.",
          "footerText": "Imobiliária Casa Nova",
          "buttons": [
            {
              "buttonId": "id1",
              "buttonText": {
                "displayText": "1-Aluguel de imóveis."
              },
              "type": "RESPONSE"
            },
            {
              "buttonId": "id2",
              "buttonText": {
                "displayText": "2-Compra de imóveis."
              },
              "type": "RESPONSE"
            },
            {
              "buttonId": "id3",
              "buttonText": {
                "displayText": "3-Venda de imóveis."
              },
              "type": "RESPONSE"
            },
            {
              "buttonId": "id4",
              "buttonText": {
                "displayText": "4-Encerrar atendimento."
              },
              "type": "RESPONSE"
            }
          ],
          "headerType": "EMPTY"
        }
      },
      "messageTimestamp": "1680292979",
      "status": "PENDING"
    }
  ],
  "type": "append"
}
-------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------

interface IButtonsResponseMessage {

    /** ButtonsResponseMessage selectedButtonId */
    selectedButtonId?: (string|null);

    /** ButtonsResponseMessage contextInfo */
    contextInfo?: (proto.IContextInfo|null);

    /** ButtonsResponseMessage type */
    type?: (proto.Message.ButtonsResponseMessage.Type|null);

    /** ButtonsResponseMessage selectedDisplayText */
    selectedDisplayText?: (string|null);
}

        /** Represents a ButtonsResponseMessage. */
        class ButtonsResponseMessage implements IButtonsResponseMessage {

            /**
             * Constructs a new ButtonsResponseMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: proto.Message.IButtonsResponseMessage);

            /** ButtonsResponseMessage selectedButtonId. */
            public selectedButtonId: string;

            /** ButtonsResponseMessage contextInfo. */
            public contextInfo?: (proto.IContextInfo|null);

            /** ButtonsResponseMessage type. */
            public type: proto.Message.ButtonsResponseMessage.Type;

            /** ButtonsResponseMessage selectedDisplayText. */
            public selectedDisplayText?: (string|null);

            /** ButtonsResponseMessage response. */
            public response?: "selectedDisplayText";

            /**
             * Creates a new ButtonsResponseMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ButtonsResponseMessage instance
             */
            public static create(properties?: proto.Message.IButtonsResponseMessage): proto.Message.ButtonsResponseMessage;

            /**
             * Encodes the specified ButtonsResponseMessage message. Does not implicitly {@link proto.Message.ButtonsResponseMessage.verify|verify} messages.
             * @param message ButtonsResponseMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: proto.Message.IButtonsResponseMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ButtonsResponseMessage message, length delimited. Does not implicitly {@link proto.Message.ButtonsResponseMessage.verify|verify} messages.
             * @param message ButtonsResponseMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: proto.Message.IButtonsResponseMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ButtonsResponseMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ButtonsResponseMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): proto.Message.ButtonsResponseMessage;

            /**
             * Decodes a ButtonsResponseMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ButtonsResponseMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): proto.Message.ButtonsResponseMessage;

            /**
             * Verifies a ButtonsResponseMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ButtonsResponseMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ButtonsResponseMessage
             */
            public static fromObject(object: { [k: string]: any }): proto.Message.ButtonsResponseMessage;

            /**
             * Creates a plain object from a ButtonsResponseMessage message. Also converts values to other types if specified.
             * @param message ButtonsResponseMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: proto.Message.ButtonsResponseMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ButtonsResponseMessage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }