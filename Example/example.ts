import { Boom } from '@hapi/boom'
import NodeCache from 'node-cache'
import makeWASocket, { AnyMessageContent, delay, DisconnectReason, fetchLatestBaileysVersion, getAggregateVotesInPollMessage, makeCacheableSignalKeyStore, makeInMemoryStore, proto, useMultiFileAuthState, WAMessageContent, WAMessageKey } from '../src'
import MAIN_LOGGER from '../src/Utils/logger'
import { extractMessageContent } from '@adiwajshing/baileys'
var bodyParser = require('body-parser')

const logger = MAIN_LOGGER.child({ })
logger.level = 'trace'

const useStore = !process.argv.includes('--no-store')
const doReplies = !process.argv.includes('--no-reply')

// external map to store retry counts of messages when decryption/encryption fails
// keep this out of the socket itself, so as to prevent a message decryption/encryption loop across socket restarts
const msgRetryCounterCache = new NodeCache()

// the store maintains the data of the WA connection in memory
// can be written out to a file & read from it
const store = useStore ? makeInMemoryStore({ logger }) : undefined
store?.readFromFile('./baileys_store_multi.json')
// save every 10s
setInterval(() => {
	store?.writeToFile('./baileys_store_multi.json')
}, 10_000)

// start a connection
const startSock = async() => {
	const { state, saveCreds } = await useMultiFileAuthState('baileys_auth_info')
	// fetch latest version of WA Web
	const { version, isLatest } = await fetchLatestBaileysVersion()
	console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)

	const sock = makeWASocket({
		version,
		logger,
		printQRInTerminal: true,
		auth: {
			creds: state.creds,
			/** caching makes the store faster to send/recv messages */
			keys: makeCacheableSignalKeyStore(state.keys, logger),
		},
		msgRetryCounterCache,
		generateHighQualityLinkPreview: true,
		// ignore all broadcast messages -- to receive the same
		// comment the line below out
		// shouldIgnoreJid: jid => isJidBroadcast(jid),
		// implement to handle retries & poll updates
		getMessage,
	})

	store?.bind(sock.ev)

	const sendMessageWTyping = async(msg: AnyMessageContent, jid: string) => {
		await sock.presenceSubscribe(jid)
		await delay(500)

		await sock.sendPresenceUpdate('composing', jid)
		await delay(2000)

		await sock.sendPresenceUpdate('paused', jid)

		await sock.sendMessage(jid, msg)
	}

	// the process function lets you process all events that just occurred
	// efficiently in a batch
	sock.ev.process(
		// events is a map for event name => event data
		async(events) => {
			// something about the connection changed
			// maybe it closed, or we received all offline message or connection opened
			if(events['connection.update']) {
				const update = events['connection.update']
				const { connection, lastDisconnect } = update
				if(connection === 'close') {
					// reconnect if not logged out
					if((lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
						startSock()
					} else {
						console.log('Connection closed. You are logged out.')
					}
				}

				console.log('connection update', update)
			}

			// credentials updated -- save them
			if(events['creds.update']) {
				await saveCreds()
			}

			if(events.call) {
				console.log('recv call event', events.call)
			}

			// history received
			if(events['messaging-history.set']) {
				const { chats, contacts, messages, isLatest } = events['messaging-history.set']
				console.log(`recv ${chats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (is latest: ${isLatest})`)
			}
			const apresentacao ='Olá a Imobiliária Casa Nova agradece o contato\n'+'Para prosseguir com o atendimento envie uma das opções abaixo:';
			const tiposNegocio: TipoNegocio[] = ['aluguel', 'compra', 'venda'];
			const tiposEncerrar: TipoEncerrar[] = ['Encerrar Atendimento.']
			const tiposImovel: TipoImovel[] = ['casa', 'apartamento', 'chácara', 'terreno', 'imóvel comercial'];
			const tiposBem: TipoBem[] = ['casa', 'apartamento', 'chácara', 'terreno', 'imóvel comercial','carro','não usarei bens como forma de pagamento'];

			let solicitacao = [{
				tipoNegocio: '' as TipoNegocio, // aluguel, compra, venda
			  },{
				tipoEncerar: '' as TipoEncerrar,
				}, {
				tipoImovel: '' as TipoImovel, // casa, apartamento, chácara, terreno, imóvel comercial
			  }, {
				bem: '' as TipoBem, // apartamento, casa, terreno, carro, imóvel comercial,chacára
			  }, {
				local: '' as string, // bairros de Franca
			  }, {
				valor: 0 as any,
			  }
			];
			type TipoNegocio = 'aluguel' | 'compra' | 'venda';
			type TipoEncerrar = 'Encerrar Atendimento.' | 'Prosseguir.'

			type TipoBem = 'casa' | 'apartamento' | 'chácara' | 'terreno' | 'imóvel comercial' | 'carro' |'não usarei bens como forma de pagamento';
			type TipoImovel = 'casa' | 'apartamento' | 'chácara' | 'terreno' | 'imóvel comercial';
			// send a buttons message!
			function createButtonsArray(menu) {
				const buttons = menu.map((menuItem, index) => ({
				  buttonId: `id${index + 1}`,
				  buttonText: { displayText: menuItem },
				  type: 1,
				}));
			  
				const buttonMessage = {
				  text: "Clique no botão que contém a opção que você deseja.",
				  footer: "Imobiliária Casa Nova",
				  buttons: buttons,
				  headerType: 1,
				};
			  
				return buttonMessage;
			  }
			

			let separa = '--$%&$%&$%&$%&$%&$%*$%*$%*$%*$%*%$*&$%&$%&$%&$%*&%&$&$%######-------'
			// received a new message
			if(events['messages.upsert']) {
				const upsert = events['messages.upsert']
				if(upsert.type === 'notify') {
					for(const msg of upsert.messages) {
						if(!msg.key.fromMe && doReplies) {
							await sock!.readMessages([msg.key])
							await sendMessageWTyping({ text: apresentacao}, msg.key.remoteJid!)
							await sock.sendMessage(msg.key.remoteJid!, createButtonsArray(tiposNegocio))
							await sock.sendMessage(msg.key.remoteJid!, createButtonsArray(tiposEncerrar))
							const message = upsert.messages[0]; // assuming there's only one message in the array
							let messageContent = msg.message!.conversation;

						}if (!msg.key.fromMe && msg.message?.buttonsResponseMessage?.selectedDisplayText === tiposEncerrar[0]){
							await sendMessageWTyping({ text: 'Você escolheu: '+tiposEncerrar[0]+'\n Atendimento finalizado.'}, msg.key.remoteJid!)//encerra o atendimento
						}else{
							let registroAtendimento:any[]=[]//registrar as opções do usuário e as perguntas do sistema
							switch (true) {
								case !msg.key.fromMe && msg.message?.buttonsResponseMessage?.selectedDisplayText === tiposNegocio[0]://aluguel
									solicitacao[0].tipoNegocio = tiposNegocio[0]
									solicitacao[0].tipoEncerar = 'Prosseguir.'
									solicitacao[0].bem ='não usarei bens como forma de pagamento'
									await sendMessageWTyping({ text: 'Você escolheu: '+tiposNegocio[0]}, msg.key.remoteJid!)
									await sendMessageWTyping({ text: 'Escolha um tipo de imóvel abaixo para prosseguir com o atendimento.'}, msg.key.remoteJid!)
									await sock.sendMessage(msg.key.remoteJid!, createButtonsArray(tiposImovel))
									for (let i = 0; i < tiposImovel.length; i++) {
										if(!msg.key.fromMe && msg.message?.buttonsResponseMessage?.selectedDisplayText ===tiposImovel[i]){
											solicitacao[0].tipoImovel=tiposImovel[i]
											await sendMessageWTyping({ text: 'Você escolheu: '+tiposImovel[i]}, msg.key.remoteJid!)
											await sendMessageWTyping({ text: 'Envie onde prefere que o imóvel esteja localizado.'}, msg.key.remoteJid!)
											let messageContent  = msg.message!.conversation;
											solicitacao[0].local = messageContent!.toString()
											await sendMessageWTyping({ text: 'Temos imóveis para'+tiposNegocio[0]+' de vários valores insira a faixa de preço que mais te interessa.'}, msg.key.remoteJid!)
											solicitacao[0].valor = messageContent
											let reportAtendimento = solicitacao.join("\n");
											await sendMessageWTyping({ text: reportAtendimento}, msg.key.remoteJid!)
										}}
									break;
								case !msg.key.fromMe && msg.message?.buttonsResponseMessage?.selectedDisplayText === tiposNegocio[1]://compra
									solicitacao[0].tipoNegocio = tiposNegocio[1]
									solicitacao[0].tipoEncerar = 'Prosseguir.'
									await sendMessageWTyping({ text: 'Dos bens abaixo deseja dar algum deles como forma de pagamento?'}, msg.key.remoteJid!)
									await sock.sendMessage(msg.key.remoteJid!, createButtonsArray(tiposBem))
									for (let i = 0; i < tiposBem.length; i++) {
										if(!msg.key.fromMe && msg.message?.buttonsResponseMessage?.selectedDisplayText ===tiposBem[i]){
											solicitacao[0].bem = tiposBem[1]
										}}
										await sock.sendMessage(msg.key.remoteJid!, createButtonsArray(tiposImovel))
									for (let i = 0; i < tiposImovel.length; i++) {
										if(!msg.key.fromMe && msg.message?.buttonsResponseMessage?.selectedDisplayText ===tiposImovel[i]){
											solicitacao[0].tipoImovel=tiposImovel[i]
											await sendMessageWTyping({ text: 'Você escolheu: '+tiposImovel[i]}, msg.key.remoteJid!)
											await sendMessageWTyping({ text: 'Envie onde prefere que o imóvel esteja localizado.'}, msg.key.remoteJid!)
											let messageContent  = msg.message!.conversation;
											solicitacao[0].local = messageContent!.toString()
											await sendMessageWTyping({ text: 'Temos imóveis para'+tiposNegocio[0]+' de vários valores insira a faixa de preço que mais te interessa.'}, msg.key.remoteJid!)
											solicitacao[0].valor = messageContent
											let reportAtendimento = solicitacao.join("\n");
											await sendMessageWTyping({ text: reportAtendimento}, msg.key.remoteJid!)
										}}
									break;
									case !msg.key.fromMe && msg.message?.buttonsResponseMessage?.selectedDisplayText === tiposNegocio[2]:
										solicitacao[0].tipoNegocio = tiposNegocio[0]
										solicitacao[0].tipoEncerar = 'Prosseguir.'
										solicitacao[0].bem ='não usarei bens como forma de pagamento'
										await sendMessageWTyping({ text: 'Você escolheu: '+tiposNegocio[2]}, msg.key.remoteJid!)
									await sendMessageWTyping({ text: 'Escolha um tipo de imóvel abaixo para prosseguir com o atendimento.'}, msg.key.remoteJid!)
									await sock.sendMessage(msg.key.remoteJid!, createButtonsArray(tiposImovel))
									for (let i = 0; i < tiposImovel.length; i++) {
										if(!msg.key.fromMe && msg.message?.buttonsResponseMessage?.selectedDisplayText ===tiposImovel[i]){
											solicitacao[0].tipoImovel=tiposImovel[i]
											await sendMessageWTyping({ text: 'Você escolheu: '+tiposImovel[i]}, msg.key.remoteJid!)
											await sendMessageWTyping({ text: 'Envie a localização do imóvel.'}, msg.key.remoteJid!)
											let messageContent  = msg.message!.conversation;
											solicitacao[0].local = messageContent!.toString()
											await sendMessageWTyping({ text: 'Em quantos R$ o imóvel que desejar vender está avaliado?'}, msg.key.remoteJid!)
											solicitacao[0].valor = messageContent
											let reportAtendimento = solicitacao.join("\n");
											await sendMessageWTyping({ text: reportAtendimento}, msg.key.remoteJid!)}
									break;
							}
					}
				}
			}}

			// messages updated like status delivered, message deleted etc.
			if(events['messages.update']) {
				console.log(
					JSON.stringify(events['messages.update'], undefined, 2)
				)

				for(const { key, update } of events['messages.update']) {
					if(update.pollUpdates) {
						const pollCreation = await getMessage(key)
						if(pollCreation) {
							console.log(
								'got poll update, aggregation: ',
								getAggregateVotesInPollMessage({
									message: pollCreation,
									pollUpdates: update.pollUpdates,
								})
							)
						}
					}
				}
			}

			if(events['message-receipt.update']) {
				console.log(events['message-receipt.update'])
			}

			if(events['messages.reaction']) {
				console.log(events['messages.reaction'])
			}

			if(events['presence.update']) {
				console.log(events['presence.update'])
			}

			if(events['chats.update']) {
				console.log(events['chats.update'])
			}

			if(events['contacts.update']) {
				for(const contact of events['contacts.update']) {
					if(typeof contact.imgUrl !== 'undefined') {
						const newUrl = contact.imgUrl === null
							? null
							: await sock!.profilePictureUrl(contact.id!).catch(() => null)
						console.log(
							`contact ${contact.id} has a new profile pic: ${newUrl}`,
						)
					}
				}
			}

			if(events['chats.delete']) {
				console.log('chats deleted ', events['chats.delete'])
			}
		}
})

	return sock

	async function getMessage(key: WAMessageKey): Promise<WAMessageContent | undefined> {
		if(store) {
			const msg = await store.loadMessage(key.remoteJid!, key.id!)
			return msg?.message || undefined
		}

		// only if store is present
		return proto.Message.fromObject({})
	}
}

startSock()