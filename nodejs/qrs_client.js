var __ = require('lodash')
var midi = require('midi')

var REMOTEPORT = 12345;

// ============================================================
// check localhost and localport
var LOCALHOST = '192.168.0.101';
var LOCALPORT = 12346;
var MAXDEVICES = 100;
// ==============================

var output = new midi.output();
var numPort = output.getPortCount();
console.log("numPort " + numPort)
if(numPort<1){
	console.log("!!! Please open MIDIMock for sound")
}
output.getPortName(0)
output.openPort(0)

var dgram = require('dgram');

var message = new Buffer('My KungFu is Good!');

var client = dgram.createSocket('udp4');
var server = dgram.createSocket('udp4');

server.on('listening', ()=>{
	var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
})

let meanVal = 0;
let val = 0;

server.on('message', (message, remote)=>{
	// console.log(message.toString());

	var clinetId = -1
	var bpm = 0
	var msgSplit = message.toString().trim().split('#')
	msgSplit.forEach(seg=>{
		var k_v = seg.split(":")
		switch(k_v[0]){
		case "ID":
			clinetId = parseInt(k_v[1])
			break;
		case "BPM":
			bpm = k_v[1]
			// console.log("ID:"+clinetId + " bpm:"+bpm)
			// console.log(remote.address + "--" + remote.port)
			output.sendMessage([144+clinetId, 64+clinetId, 90])
			break;
		case "VAL":
			val = parseInt(k_v[1])
			let newVal = Math.round(val - meanVal)
			meanVal = meanVal * 0.95 + val * 0.05
			let display = Math.pow(10, Math.round((newVal + 400)/40))
			display = display < 1 ? 1 : display
			console.log("ID:"+clinetId + " val:"+ display)
			break;
		default:
		}
	})
	setTimeout(()=>{
		output.sendMessage([128+clinetId, 64+clinetId, 40])
	}, 100)

});

server.bind(LOCALPORT, LOCALHOST);
