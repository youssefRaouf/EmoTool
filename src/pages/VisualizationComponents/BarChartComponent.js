import React from "react"
import colors from './Colors'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function BarChartComponent(){
    
    return(
      <div>
          <Bar
            
            data={{
              labels:['Sadness', 'Joy', 'Fear', 'Anger','Surprise','Neutral','Disgust'],
              datasets: [
                {
                  label:'Date would be put here',
                  data:[12,19,3,5,2,3,1],
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
                },
              ],
            }}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false,
            }}
          />
      </div>
    )
}