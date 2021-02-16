import React, { createRef } from 'react'
import Visualizer from './Visualizer'
import '../App.css'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css' 
import soundFile from '../songs/stereolove.mp3'


class FrequencyMap extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            playing : null,
            context : false,
            pause : false,
        }
        this.player = createRef()
        this.frequencyBandArray = [...Array(50).keys()]
    }
     buildContext = () => {
        if(this.state.playing === null){
            const songAudio = this.player.current.audio.current
            const ctx = new AudioContext()
            const audioElement = ctx.createMediaElementSource(songAudio)
            const analyser = ctx.createAnalyser()
            audioElement.connect(ctx.destination)
            audioElement.connect(analyser)
            this.setState(
                {
                    data : analyser,
                    playing : true,
                    context : ctx,
                    pause : true

                }
            )

        }
        else if (this.state.pause === true){
            this.state.context.suspend().then( () => {
                this.setState({
                    pause : false
                })
            })
        }
        else if (this.state.playing === true) {
            this.state.context.resume().then( () => {
                this.setState({
                    playing : true,
                    pause : true
                })
            })
        }
            
    }


    getFrequency = (stuff) => {
        if (this.state.data){
            const buffer = this.state.data.frequencyBinCount;
            const amp = new Uint8Array(buffer)
            this.state.data.getByteFrequencyData(amp)
            stuff(amp)
        }
    }
    render(){
        return(
            <Visualizer
                player = {this.player}
                buildContext = {this.buildContext}
                getFrequency = {this.getFrequency}
                frequencyBandArray = {this.frequencyBandArray}
                data = {this.data}
                playing = {this.playing}
                pause = {this.pause}
            >
            </Visualizer>
        )
    }
}

export default FrequencyMap