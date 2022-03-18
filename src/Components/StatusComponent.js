import React from "react"
import "../styles/checkboxes.scss"
import recommendations from '../recommendations/recommend.json'

export default function Status({status}){

    return (
        <div id="txt">
                
        {recommendations.map( (emotion) =>  {
            return emotion.label == status.label ? 
            <div>
                <h1>Your Frequent Emotion is <div style={{color:emotion.color}} >{status.label} </div> </h1>
                <div>{emotion.advice}</div>
                <a id="links" href={emotion.content[Math.floor(Math.random()*emotion.content.length)]}> Pick a Recommendation!</a>
            </div> : 
            <div></div>
        })}
        </div>

    )
}