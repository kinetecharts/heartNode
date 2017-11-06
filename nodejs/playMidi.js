var __ = require('lodash')
var midi = require('midi')

global.output = new midi.output();
var numPort = output.getPortCount();
console.log("numPort " + numPort)
if(numPort<1){
	console.log("!!! Please open MIDIMock or MIDIKey for sound")
}
output.getPortName(0)
output.openPort(0)

// play a note
// output.sendMessage([144, 60, 90])
// stop a note 
// output.sendMessage([128, 60, 0])


let Series=function(root, kind){
    return kind.map(x=>x+root)
}

let playMidi=function(id, root, kind, speed, duration){
    let note = Series(root, kind)[id]
    playMidiNote(id, note, speed, duration)
    // output.sendMessage([144+id, note, speed])
    // setTimeout(()=>{
    //     output.sendMessage([128+id, note, speed])
    // }, duration)
};

let playMidiNote=function(id, note, speed, duration){
    // console.log(note, duration)
    output.sendMessage([144+id, note, speed])
    setTimeout(()=>{
        output.sendMessage([128+id, note, speed])
    }, duration)
};

global.Major=[0, 4, 7, 12]
global.Major7=[0, 4, 7, 11]
global.Minor=[0, 3, 7, 12]
global.Minor7=[0, 3, 7, 10]

global.C = 60
global.Cs = 61
global.D = 62
global.Ef = 63
global.E = 64
global.F = 65
global.Fs = 66 
global.G = 67
global.Gs = 68
global.A = 69
global.As = 70
global.B = 71

module.exports={playMidi, playMidiNote, Series};