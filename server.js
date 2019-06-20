function bootstrapSocketServer(io) {
	io.on('connection', (socket) => {
		socket.on('register', (regDetail) =>{
		
		socket.emit('addedToChannel',{channel: regDetail.channels});
		socket.emit('welcomeMessage', `Welcome ${regDetail.username} !!`);

		socket.on('joinChannel', (channelName) =>{
			socket.emit('addedToChannel',{channel: channelName.channel});
		})

		socket.on('leaveChannel', (channelName) =>{
			socket.emit('removedFromChannel',{channel: channelName.channel});
		})

		socket.on('message', (messageDetail) =>{
			socket.broadcast.emit('newMessage',messageDetail);
		})

		})
	});
}

module.exports = bootstrapSocketServer;
