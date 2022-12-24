// const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'leo__bot',
		password: 'oauth:vdupbuqjacazzbz3zcfehkta5y68kb'
	},
	channels: [ 'leovargasdev' ]
});

client.connect().catch(console.error);

const chat = document.getElementById('chat')

// propriedades do obj tags
// {
// 	subscriber: flag do sub
// 	username: nome do usuário
// 	color: cor do nome
// 	first-msg: flag para saber se é a primeira mensagem
// }

client.on('message', (channel, tags, message, self) => {
  const paragraph = document.createElement('p')
	paragraph.setAttribute('id', tags.id)

	const chars = message.split('')

	const strong = document.createElement('span')
	strong.innerHTML = tags.username + ':'
	console.log(tags.color)
	const isColorMarnellyy = tags.color === '#EFFF00'
	const color = isColorMarnellyy ? '#768' : tags.color
	strong.style.color = color || '#333'

	paragraph.appendChild(strong)

	chars.forEach(char => {
		const span = document.createElement('span')
		span.innerHTML = char
		paragraph.append(span)
	});

  chat.append(paragraph)

	anime({
    targets: `#${tags.id} span`,
    duration: 800,
    easing: 'easeOutElastic',
    opacity: [0, 1],
    delay: (t, i) => i * 40,
		translateX: [-300, 0]
  })

	paragraph.scrollIntoView({block: 'end', behavior: 'smooth'})
});