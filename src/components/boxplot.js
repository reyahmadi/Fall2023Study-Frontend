import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);



const BoxPlot = (props) => {

  const [options, setOptions] = useState([])

  useEffect(() => {
    if(props.data)
    setOptions({
      title: {
        text: ''
      },
    
      chart: {
        height: 200,
        inverted: true
    },
    xAxis: {
      visible: false
    },
    yAxis: {
      visible: true,
      title: {
        text: ''
      }
    },
    legend:{
      enabled: false
    },
      series: [{
        type: 'boxplot',
        pointWidth: 20,
        data: [
          props.data
        ],
        tooltip: {
            headerFormat: '<em>Experiment No {point.key}</em><br/>'
        }
    },
    {
      type: 'line',
      data: [props.you]} 
    ]
    })
  }, [props.data])

  return (<HighchartsReact
    highcharts={Highcharts}
    options={options}
  />)
}
export default BoxPlot;