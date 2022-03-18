import React from "react"
import "../styles/checkboxes.scss"

const Filter = ({ handleCheckBox, filters = [] }) => {
  return (
    <div id="grb">
      <h1 id="example-page-main-heading">Filter Tweets</h1>
      <main>
        <div className="example-box">
          <div>
            <label htmlFor="check-1">Joy</label>
            <div className="checkbox-wrapper">
              <input checked={filters.includes('joy')} onChange={handleCheckBox} type="checkbox" name="labels" value="joy" />
              <span aria-hidden="true"></span>
            </div>
          </div>
          <div>
            <label htmlFor="check-2">Sadness</label>
            <div className="checkbox-wrapper">
              <input checked={filters.includes('sadness')} onChange={handleCheckBox} type="checkbox" name="labels" value="sadness" />
              <span aria-hidden="true"></span>
            </div>
          </div>
          <div>
            <label htmlFor="check-3">Anger</label>
            <div className="checkbox-wrapper">
              <input checked={filters.includes('anger')} onChange={handleCheckBox} type="checkbox" name="labels" value="anger" />
              <span aria-hidden="true"></span>
            </div>
          </div>
          <div>
            <label htmlFor="check-4">Disgust</label>
            <div className="checkbox-wrapper">
              <input checked={filters.includes('disgust')} onChange={handleCheckBox} type="checkbox" name="labels" value="disgust" />
              <span aria-hidden="true"></span>
            </div>
          </div>
          <div>
            <label htmlFor="check-5">Fear</label>
            <div className="checkbox-wrapper">
              <input checked={filters.includes('fear')} onChange={handleCheckBox} type="checkbox" name="labels" value="fear" />
              <span aria-hidden="true"></span>
            </div>
          </div>
          <div>
            <label htmlFor="check-6">Surprise</label>
            <div className="checkbox-wrapper">
              <input checked={filters.includes('surprise')} onChange={handleCheckBox} type="checkbox" name="labels" value="surprise" />
              <span aria-hidden="true"></span>
            </div>
          </div>
          <div>
            <label htmlFor="check-7">Neutral</label>
            <div className="checkbox-wrapper">
              <input checked={filters.includes('neutral')} onChange={handleCheckBox} type="checkbox" name="labels" value="neutral" />
              <span aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default Filter