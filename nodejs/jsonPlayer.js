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
        let third = parseInt(60*1000/this.bpm)/3
        
        // beat={begin:[], '1t': [], '2t': []}
        let beat = this.data[this.noteIdx]
        // console.log(beat)
        if(beat==undefined) console.log(beat)

        __.forEach(beat, (notes, timing)=>{
            switch(timing){
                case 'begin':
                    __.forEach(notes, n=>{playMidiNote(this.id, n, this.v0, duration)})
                break
                case '1t':
                    let notes1t = [...notes]
                    // console.log('1t', notes1t)
                    setTimeout(()=>{
                        __.forEach(notes1t, n=>{playMidiNote(this.id, n, this.v1, third/1.1)})
                    }, third)
                break
                case '2t':
                    let notes2t = [...notes]
                    // console.log('2t', notes2t)
                    setTimeout(()=>{
                        __.forEach(notes2t, n=>{playMidiNote(this.id, n, this.v1, third/1.1)})
                    }, 2*third)
                break
                default:
                    console.log(timing + " is not supported")
            }
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