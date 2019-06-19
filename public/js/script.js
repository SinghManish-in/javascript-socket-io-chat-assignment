function sendMessage(event, socket) {
	event.preventDefault();
	let channel = document.getElementById('channel').value;
	let message = document.getElementById('message').value;
	let username = document.getElementById('username').value;

	let div1 = document.createElement('div');
	div1.className = 'col-12';

	let div2 = document.createElement('div');
	div2.className = 'card received-message';

	let div3 = document.createElement('div');
	div3.className = 'card-body';

	let p = document.createElement('p');
	p.className = 'card-text';
	p.innerHTML = `Me : ${message}`;

	div3.appendChild(p);
	div2.appendChild(div3);
	div1.appendChild(div2);

	let root = document.getElementById('chatContainer');
	root.insertBefore(div1, root.firstChild);
	
	socket.emit('message', {username:username, channel: channel, message:message});
}

function joinChannel(event, socket) {
	let newchannel = document.getElementById('newchannel').value;
	socket.emit('joinChannel', {channel: newchannel});

}

function leaveChannel(event, socket) {
	let newChannel = document.getElementById('newchannel').value;
	socket.emit('leaveChannel', {channel: newChannel});

}

function onWelcomeMessageReceived(message) {
	let div1 = document.createElement('div');
	div1.className = 'col-12';

	let div2 = document.createElement('div');
	div2.className = 'card received-message';

	let div3 = document.createElement('div');
	div3.className = 'card-body';

	let p = document.createElement('p');
	p.className = 'card-text';
	p.innerHTML = `System : ${message}`;

	div3.appendChild(p);
	div2.appendChild(div3);
	div1.appendChild(div2);

	let root = document.getElementById('chatContainer');
	root.appendChild(div1);
}

function onNewMessageReceived(messageDetail) {
	//Display the Message
	let div1 = document.createElement('div');
	div1.className = 'col-12';

	let div2 = document.createElement('div');
	div2.className = 'card received-message';

	let div3 = document.createElement('div');
	div3.className = 'card-body';

	let p = document.createElement('p');
	let message = `${messageDetail.username} : ${messageDetail.message}`
	p.className = 'card-text';
	p.innerHTML = message;

	div3.appendChild(p);
	div2.appendChild(div3);
	div1.appendChild(div2);

	let root = document.getElementById('chatContainer');
	root.insertBefore(div1, root.firstChild);
}

function onAddedToNewChannelReceived(channelDetail) {
	let alertMessage = document.getElementById("alertContainer");
	let channelsList =  document.getElementById("channelsList");
	let existingOptions = channelsList.innerHTML;
	let option='';
	const channels = channelDetail.channel === '' ? [] : channelDetail.channel.split(',');
	channels.forEach(channel =>{
		option = option + `<option value="${channel}"/>`
	})
	//dataList.innerHTML = option;
	channelsList.innerHTML = option.concat(existingOptions);
	let msg = `You are added to <strong>${ channelDetail.channel }</strong> successfully!`
	alertMessage.innerHTML = msg;
}


function onRemovedFromChannelReceived(channelDetail) {
	let alertMsg = document.getElementById("alertContainer");
	let msg = `You are removed from <strong>${ channelDetail.channel }</strong> successfully!`
	alertMsg.innerHTML = msg;
}

module.exports = {
	sendMessage,
	joinChannel,
	leaveChannel,
	onWelcomeMessageReceived,
	onNewMessageReceived,
	onAddedToNewChannelReceived,
	onRemovedFromChannelReceived
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution

