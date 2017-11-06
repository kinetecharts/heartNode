var __ = require('lodash')
const {playMidi, Series} =require('./playMidi')
const BasePlayer = require('./basePlayer')
const MelodyPlayer = require('./melodyPlayer')

var REMOTEPORT = 12345;

// ============================================================
// check localhost and localport
var LOCALHOST = '192.168.0.101';
// var LOCALHOST = '192.168.3.1';
var LOCALPORT = 12346;
var MAXDEVICES = 100;
// ==============================

var dgram = require('dgram');

var message = new Buffer('My KungFu is Good!');

global.basePlayer = new BasePlayer(0, 72)
global.melodyPlayer = new MelodyPlayer(2, 80)

let startQRS=function(callback){

	var udpClient = dgram.createSocket('udp4');
	var udpServer = dgram.createSocket('udp4');

	udpServer.on('listening', ()=>{
		var address = udpServer.address();
		console.log('UDP Server listening on ' + address.address + ":" + address.port);
	})

	let meanVal = 0;
	let val = 0;

	udpServer.on('message', (message, remote)=>{
		// console.log(message.toString());

		var clientId = -1
		var bpm = 0
		var msgSplit = message.toString().trim().split('#')
		msgSplit.forEach(seg=>{
			var k_v = seg.split(":")
			switch(k_v[0]){
			case "ID":
			clientId = parseInt(k_v[1])
				break;
			case "BPM":
				bpm = k_v[1]
				if(DEBUG)
					console.log("ID:"+clientId + " bpm:"+bpm)
				// console.log(remote.address + "--" + remote.port)
				// callback(bpm)
				// output.sendMessage([144+clientId, 64+clientId, 90])
				// [channel, note, speed]
				// 9x (144+x) note on, 8x (128+x) note off
				// playMidi(clientId-1, Root, Kind, 100, 100)
				switch(clientId){
					case 0:
						basePlayer.play()
						break
					case 2:
						melodyPlayer.play()
						break
					default:
						playMidi(clientId-1, Root, Kind, 100, 100)
				}
				break;
			case "VAL":
				val = parseInt(k_v[1])
				let newVal = Math.round(val - meanVal)
				meanVal = meanVal * 0.95 + val * 0.05
				let display = Math.pow(10, Math.round((newVal + 400)/40))
				display = display < 1 ? 1 : display
				if(callback)
					callback({id: clientId, val: val})
				// console.log(val)
				// console.log("ID:"+clientId + " val:"+ display)
				break;
			default:
			}
		})



	});

	udpServer.bind(LOCALPORT, LOCALHOST);
}

module.exports = startQRS;