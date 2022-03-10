import React from "react"
import './visualization.css'
import Footer from './Footer'
import BarChartComponent from './BarChartComponent'
import PieChartComponent from './PieChartComponent'
import MultiLineComponent from './MultiLineComponent'

export default function Visualization(){
    return (
        <div className="visualization-div">
            <BarChartComponent />
            <PieChartComponent />
            <MultiLineComponent />
            <Footer/>
        </div>
    )
}