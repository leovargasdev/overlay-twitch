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

function setUsernameInParagraph(tags, paragraph) {
	const username = document.createElement('span')

	username.innerHTML = tags.username + ':'
	username.style.color = tags.color || '#7F5AF0'

	paragraph.append(username)
}

function setMessageInParagraph(message, paragraph) {
	const chars = message.split('')

	chars.forEach(char => {
		const span = document.createElement('span')
		span.innerHTML = char
		paragraph.append(span)
	});
}

client.on('message', (channel, tags, message, self) => {
  const paragraph = document.createElement('p')
	paragraph.setAttribute('id', tags.id)

	setUsernameInParagraph(tags, paragraph)

	setMessageInParagraph(message, paragraph)

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