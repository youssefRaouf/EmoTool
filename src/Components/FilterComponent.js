import React from "react"
import "../styles/checkboxes.scss"

export default function Filter({handleCheckBox}){

    return (
        <div id="grb">
        <h1 id="example-page-main-heading">Filter Tweets</h1>
        <main>
            <div className="example-box">
            <div>
              <label htmlFor="check-1">Joy</label>
              <div className="checkbox-wrapper">
              <input onChange={handleCheckBox} type="checkbox" name="labels" value="Joy" />
                <span aria-hidden="true"></span>
              </div>
            </div>
            
            <div>
              <label htmlFor="check-2">Sadness</label>
              <div className="checkbox-wrapper">
                <input onChange={handleCheckBox} type="checkbox" name="labels" value="Sadness"   />
                <span aria-hidden="true"></span>
              </div>
            </div>
            
            <div>
              <label htmlFor="check-3">Anger</label>
              <div className="checkbox-wrapper">
                <input onChange={handleCheckBox} type="checkbox" name="labels" value="Anger"  />
                <span aria-hidden="true"></span>
              </div>
            </div>
            
            <div>
              <label htmlFor="check-4">Disgust</label>
              <div className="checkbox-wrapper">
                <input onChange={handleCheckBox} type="checkbox" name="labels" value="Disgust"  />
                <span aria-hidden="true"></span>
              </div>
            </div>
            
            <div>
              <label htmlFor="check-5">Fear</label>
              <div className="checkbox-wrapper">
                <input onChange={handleCheckBox} type="checkbox" name="labels" value="Fear"  />
                <span aria-hidden="true"></span>
              </div>
            </div>
            
            <div>
              <label htmlFor="check-6">Surprise</label>
              <div className="checkbox-wrapper">
                <input onChange={handleCheckBox} type="checkbox" name="labels" value="Surprise"  />
                <span aria-hidden="true"></span>
              </div>
            </div>
            
            <div>
              <label htmlFor="check-7">Neutral</label>
              <div className="checkbox-wrapper">
                <input onChange={handleCheckBox} type="checkbox" name="labels" value="Neutral"   />
                <span aria-hidden="true"></span>
              </div>
            </div>
           </div>
           </main>
        </div> 

    )
}