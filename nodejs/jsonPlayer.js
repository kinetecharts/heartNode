const {playMidi, playMidiNote, Series} =require('./playMidi')
const csv = require("fast-csv")
const fs = require('fs')
const __ = require('lodash')

// const fname = 'scores/voice_b_all.json'

class JsonPlayer{
    constructor(id, bpm, fname){
        console.log("init Json Player")
        this.id = id
        this.data = []
        this.bpm = bpm
        
        this.v0 = 100
        this.v1 = 60

        this.shift = 0

        this.noteIdx = 0
        this.playing = true
        // this.loadData()
        this.loadJson(fname)
    }
    loadJson(fname){
        console.log('loading ', fname)
        this.data = JSON.parse(fs.readFileSync(fname), 'utf8')
        this.noteIdx = 0
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
        // console.log('play')
        this.noteIdx = this.noteIdx > this.data.length-1 ? 0 : this.noteIdx
        let notes = this.data[this.noteIdx].notes
        let beats = this.data[this.noteIdx].beats

        let duration = parseInt(60*1000/this.bpm) //let note last 2/3 of heart beat
        let unit_time = duration / beats
        
        __.forEach(notes, note=>{
            setTimeout(()=>{
                playMidiNote(this.id, note.pitch+this.shift, this.v0, note.dur*unit_time/1.1)
            }, unit_time * note.pos)

        })

        this.noteIdx++
    }

    setShift(_shift){
        this.shift = _shift
    }
    reset(){
        this.noteIdx = 0
    }
}

module.exports=JsonPlayer;