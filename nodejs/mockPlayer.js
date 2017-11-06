// const {playMidi, playMidiNote, Series} =require('./playMidi')
// const sequence=[60, 62, 64, 65, 67, 69, 65, 62, 67, 60, 65, 65, 64, 62, 64, 62]

const MelodyPlayer=require('./melodyPlayer')
const BasePlayer = require('./basePlayer')
const JsonPlayer = require('./jsonPlayer')

class MockPlayer{
    constructor(id, bpm, type, fname){
        this.id = id
        this.bpm =bpm
        this.player
        if(type=="Base"){
            this.player = new BasePlayer(id, bpm)
        }else if(type=="Melody"){
            this.player = new MelodyPlayer(id, bpm)
        }else if(type=="Json"){
            this.player = new JsonPlayer(id, bpm, fname)
        }
        
        this.next =null
    }
    start(){
        this.play()
    }
    stop(){
        clearTimeout(this.next)
    }
    play(){
        this.player.play()
        this.next = setTimeout(()=>{this.play()}, 60 / (this.bpm + Math.random()*5) * 1000)
    }

    setShift(shift){
        this.player.setShift(shift)
    }
    reset(){
        this.player.reset()
    }
}

module.exports=MockPlayer;