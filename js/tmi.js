const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: 'leo__bot',
		password: 'oauth:peucva7k1rutafchxw3xbzd0p88gpo'
	},
	channels: ['leovargasdev']
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

function setMessageWithEmoteInParagraph(message, emotes, paragraph) {
  const stringReplacements = [];

  // iterate of emotes to access ids and positions
  Object.entries(emotes).forEach(([id, positions]) => {
    // use only the first position to find out the emote key word
    const position = positions[0];
    const [start, end] = position.split("-");
    const stringToReplace = message.substring(
      parseInt(start, 10),
      parseInt(end, 10) + 1
    );

    stringReplacements.push({
      stringToReplace: stringToReplace,
      replacement: `<img src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/1.0" />`,
    });
  });

	// generate HTML and replace all emote keywords with image elements
  const messageHTML = stringReplacements.reduce(
    (acc, { stringToReplace, replacement }) => {
      // obs browser doesn't seam to know about replaceAll
      return acc.split(stringToReplace).join(replacement);
    },
    message
  );

	const paragraphMessage = document.createElement('p')
	paragraphMessage.innerHTML = messageHTML

	paragraph.appendChild(paragraphMessage)
}

client.on('message', (channel, tags, message, self) => {
  const paragraph = document.createElement('p')
	paragraph.setAttribute('id', tags.id)

	setUsernameInParagraph(tags, paragraph)

	const isEmotes = tags.emotes

	if(isEmotes) {
		setMessageWithEmoteInParagraph(message, tags.emotes, paragraph)
	} else {
		setMessageInParagraph(message, paragraph)
	}

  chat.append(paragraph)

	anime({
    targets: `#${tags.id} span`,
    duration: 800,
    easing: 'easeOutElastic',
    opacity: [0, 1],
    delay: (t, i) => i * 40,
		translateY: [-300, 0]
  })

	paragraph.scrollIntoView({block: 'end', behavior: 'smooth'})
});