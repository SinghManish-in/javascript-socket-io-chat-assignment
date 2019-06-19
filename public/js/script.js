function sendMessage(event, socket) {
	event.preventDefault();
	let channelName = document.getElementById('channel').value;
	let msg = document.getElementById('message').value;
	let username = document.getElementById('username').value;

	//Display the Message
	let div0 = document.createElement('div');
	div0.className = 'col-12';

	let div1 = document.createElement('div');
	div1.className = 'card received-message';

	let div2 = document.createElement('div');
	div2.className = 'card-body';

	let p = document.createElement('p');
	p.className = 'card-text';
	p.innerHTML = `Me : ${msg}`;

	div2.appendChild(p);
	div1.appendChild(div2);
	div0.appendChild(div1);

	let root = document.getElementById('chatContainer');
	root.insertBefore(div0, root.firstChild);
	//Emit Message
	socket.emit('message', {username:username, channel: channelName, message:msg});
}

function joinChannel(event, socket) {
	let channelsInpt = document.getElementById('newchannel').value;
	socket.emit('joinChannel', {channel: channelsInpt});

}

function leaveChannel(event, socket) {
	let channelName = document.getElementById('newchannel').value;
	socket.emit('leaveChannel', {channel: channelName});

}

function onWelcomeMessageReceived(message) {
	let div0 = document.createElement('div');
	div0.className = 'col-12';

	let div1 = document.createElement('div');
	div1.className = 'card received-message';

	let div2 = document.createElement('div');
	div2.className = 'card-body';

	let p = document.createElement('p');
	p.className = 'card-text';
	p.innerHTML = `System : ${message}`;

	div2.appendChild(p);
	div1.appendChild(div2);
	div0.appendChild(div1);

	let root = document.getElementById('chatContainer');
	root.appendChild(div0);
}

function onNewMessageReceived(messageDetail) {
	//Display the Message
	let div0 = document.createElement('div');
	div0.className = 'col-12';

	let div1 = document.createElement('div');
	div1.className = 'card received-message';

	let div2 = document.createElement('div');
	div2.className = 'card-body';

	let p = document.createElement('p');
	let message = `${messageDetail.username} : ${messageDetail.message}`
	p.className = 'card-text';
	p.innerHTML = message;

	div2.appendChild(p);
	div1.appendChild(div2);
	div0.appendChild(div1);

	let root = document.getElementById('chatContainer');
	root.insertBefore(div0, root.firstChild);
}

function onAddedToNewChannelReceived(channelDetail) {
	let alertMsg = document.getElementById("alertContainer");
	let dataList =  document.getElementById("channelsList");
	let existingOptions = dataList.innerHTML;
	let option='';
	const channels = channelDetail.channel === '' ? [] : channelDetail.channel.split(',');
	channels.forEach(channel =>{
		option = option + `<option value="${channel}"/>`
	})
	//dataList.innerHTML = option;
	dataList.innerHTML = option.concat(existingOptions);
	let msg = `You are added to <strong>${ channelDetail.channel }</strong> successfully!`
	alertMsg.innerHTML = msg;
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

