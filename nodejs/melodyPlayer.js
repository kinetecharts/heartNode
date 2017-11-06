const {playMidi, playMidiNote, Series} =require('./playMidi')
const csv = require("fast-csv")

const fname = 'melody.csv'

class MelodyPlayer{
    constructor(id, bpm){
        this.id = id
        this.data = []
        this.bpm = bpm

        this.v0=100
        
        this.shift = 0

        this.noteIdx = 0
        this.playing = true
        this.loadData()
    }
    loadData(){
        this.data.length = 0
        csv
            .fromPath(fname)
            .on("data", d=>this.data.push(parseInt(d[0])))
    }
    start(){
        this.playing=true
    }
    resume(){
        this.playing=true
    }
    pause(){
        this.playing=false
    }
    stop(){
        this.playing = false
    }
    play(){
        this.noteIdx = this.noteIdx > this.data.length-1 ? 0 : this.noteIdx
        let duration = parseInt(60*1000/(1.5*this.bpm)) //let note last 2/3 of heart beat

        playMidiNote(this.id, this.data[this.noteIdx]+this.shift, this.v0, duration)
        this.noteIdx++
    }

    setShift(_shift){
        this.shift = _shift
    }
    reset(){
        this.noteIdx = 0
    }
}

module.exports=MelodyPlayer;