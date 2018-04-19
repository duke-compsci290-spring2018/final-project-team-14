var express = require('express');
var io = require('socket.io');
var route = express.Router();


// 创建socket服务
var socketIO = IO(server);
// 房间用户名单
var roomInfo = {};
socketIO.on('connection', function (socket) {
	var url = socket.request.headers.referer;
	var splited = url.split('/');
	var roomID = splited[splited.length - 1];
	// 获取房间ID
	var user = '';
	socket.on('join', function (userName) {
		user = userName; // 将用户昵称加入房间名单中
		if (!roomInfo[roomID]) {
			roomInfo[roomID] = [];
		}
		roomInfo[roomID].push(user);
		socket.join(roomID); // 加入房间 // 通知房间内人员
		socketIO.to(roomID).emit('sys', user + '加入了房间', roomInfo[roomID]);
		console.log(user + '加入了' + roomID); });
		socket.on('leave', function () { socket.emit('disconnect');
	});
	socket.on('disconnect', function () {
	// 从房间名单中移除
		var index = roomInfo[roomID].indexOf(user);
		if (index !== -1) {
			roomInfo[roomID].splice(index, 1);
		}
		socket.leave(roomID); // 退出房间
		socketIO.to(roomID).emit('sys', user + '退出了房间', roomInfo[roomID]);
		console.log(user + '退出了' + roomID);
	}); // 接收用户消息,发送相应的房间
	socket.on('message', function (msg) {
	// 验证如果用户不在房间内则不给发送
		if (roomInfo[roomID].indexOf(user) === -1) {
			return false;
		}
		socketIO.to(roomID).emit('msg', user, msg);
	});
}); // room page
router.get('/room/:roomID', function (req, res) {
	var roomID = req.params.roomID; // 渲染页面数据(见views/room.hbs)
	res.render('room', { roomID: roomID, users: roomInfo[roomID] });
});
