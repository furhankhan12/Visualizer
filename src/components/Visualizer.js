import React, { createRef, useRef } from 'react'
import '../App.css'
import image from '../songs/songart.jpg'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css' 
import soundFile from '../songs/piano.mp3'
export default function Visualizer(props) {

    const ampValue = useRef(null)
    function styleVisualizer(amplitudes){

        ampValue.current = amplitudes;
        let soundBar = props.frequencyBandArray.map((id) =>
          document.getElementById(id))

          for (let i=0; i<props.frequencyBandArray.length; i++){
            let id = props.frequencyBandArray[i]
            soundBar[id].style.height = `${Math.max(ampValue.current[id], 10)}px`
            soundBar[id].style.backgroundColor = `rgb(${252},${ampValue.current[id]}, 17)`
        }
    }
    
    function runSpectrum(){
        props.getFrequency(styleVisualizer)
        requestAnimationFrame(runSpectrum)
    }

    function toggle(){
        props.buildContext()
        requestAnimationFrame(runSpectrum)
    }
    return (
    <div>
<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
<section>
<div>
        <AudioPlayer
        src = {soundFile}
        ref = {props.player}
        onPlay = {toggle}
        onPause = {toggle}
        >
        </AudioPlayer>
</div>
<div className = {'imageContainer'}>
   <br></br>
   <h1 className = {'titleText'}>Music Visualizer<br></br>Furhan Khan</h1>
  <img className = {'artwork'} src = {image}></img>
</div>
<div className = {'flexContainer'}>

{props.frequencyBandArray.map((id) =>
  <div
    className={'frequencyBands'}
    elevation={1}
    id={id}
    key={id}
  />
)}
</div>
</section>
<div className = {'homeContainer'}>
<h1><a  className = {'home'} href = "https://furhan-website.vercel.app/"><i class="fas fa-home"></i></a></h1>
</div>
</div>
    )
}