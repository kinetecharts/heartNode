const {playMidi, playMidiNote, Series} =require('./playMidi')
const csv = require("fast-csv")

const fname = 'base.csv'

class BasePlayer{
    constructor(id, bpm){
        this.id = id
        this.data = []
        this.bpm = bpm
        
        this.v0 = 100
        this.v1 = 60

        this.shift = 0

        this.noteIdx = 0
        this.playing = true
        this.loadData()
    }
    loadData(){
        this.data.length = 0
        csv
            .fromPath(fname)
            .on("data", d=>this.data.push(
                d.map(x=>parseInt(x))
                // parseInt(d[0])
            ))
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
        let duration = parseInt(60*1000/(1.1*this.bpm)) //let note last 2/3 of heart beat

        if(this.data[this.noteIdx]==undefined) console.log(this.data[this.noteIdx])

        playMidiNote(this.id, this.data[this.noteIdx][0]+this.shift, this.v0, duration)
        let third = parseInt(60*1000/this.bpm)/3

        let note0 = this.data[this.noteIdx][1]+this.shift
        let note1 = this.data[this.noteIdx][2]+this.shift
        setTimeout(()=>{
            playMidiNote(this.id, note0, this.v1, parseInt(third/1.2))
            playMidiNote(this.id, note1, this.v1, parseInt(third/1.2))
        }, third)

        note0 = this.data[this.noteIdx][3]+this.shift
        note1 = this.data[this.noteIdx][4]+this.shift
        setTimeout(()=>{
            playMidiNote(this.id, note0, this.v1, parseInt(third/1.2))
            playMidiNote(this.id, note1, this.v1, parseInt(third/1.2))
        }, 2*third)

        this.noteIdx++
    }

    setShift(_shift){
        this.shift = _shift
    }
    reset(){
        this.noteIdx = 0
    }
}

module.exports=BasePlayer;