import React from 'react';
import colors from './Colors'
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const state = {
    labels: ['Sadness', 'Joy', 'Fear', 'Anger','Surprise','Neutral','Disgust'],
    datasets: [
      {
        label: 'Sadness',
        backgroundColor:'transparent',
        borderColor: colors.sadness.background,
        borderWidth:4,
        data:[12,19,3,5,2,3,1],
      },
      {
        label: 'Joy',
        backgroundColor:'transparent',
        borderColor: colors.joy.background,
        borderWidth:4,
        data:[20,13,2,8,4,15,9],
      },
      {
        label: 'Fear',
        backgroundColor:'transparent',
        borderColor: colors.fear.background,
        borderWidth:4,
        data:[16,19,10,8,23,19,14],
        
      },
      {
        label: 'Anger',
        backgroundColor:'transparent',
        borderColor: colors.anger.background,
        borderWidth:4,
        data:[14,12,8,15,22,26,30],
        
      },
      {
        label: 'Surprise',
        backgroundColor:'transparent',
        borderColor: colors.surprise.background,
        borderWidth:4,
        data:[2,5,7,11,8,5,3],
        
      },
      {
        label: 'Neutral',
        backgroundColor:'transparent',
        borderColor: colors.neutral.background,
        borderWidth:4,
        data:[20,15,25,22,18,14,17],
        
      },
      {
        label: 'Disgust',
        backgroundColor:'transparent',
        borderColor: colors.disgust.background,
        borderWidth:4,
        data:[25,18,35,22,20,14,17],
        
      }
    ]
}
  
const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
}  

export default function MultiLineComponent() {
    return (
        <div className='line-div'>
            <Line 
                options={options}
                data={state} 
            />
        </div>
    )
    
}