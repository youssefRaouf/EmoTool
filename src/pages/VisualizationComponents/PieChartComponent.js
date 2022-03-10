import React from 'react'
import './visualization.css'
import colors from './Colors'
import {Pie} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



const data = {
  labels: ['Sadness', 'Joy', 'Fear', 'Anger','Surprise','Neutral','Disgust'],
  datasets: [
    {
      label: 'Pie Char Emotional Analysis',
      backgroundColor:[
        colors.sadness.background,
        colors.joy.background,
        colors.fear.background,
        colors.anger.background,
        colors.surprise.background,
        colors.neutral.background,
        colors.disgust.background,
      ],
      borderColor:[
        colors.sadness.border,
        colors.joy.border,
        colors.fear.border,
        colors.anger.border,
        colors.surprise.border,
        colors.neutral.border,
        colors.disgust.border,
      ],
      borderWidth:2.5,
      data:[12,19,3,5,2,3,1],
    }
  ]
}

export default function PieChartComponent() {
    return (
      <div className='pie-chart-component-div'>
            <Pie
                data={data}
                options={{
                    title:{
                    display:true,
                    text:'Pie Chart',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
            />
      </div>
    );
}
