import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

function getPercentile(data, percentile) {
  data.sort(numSort);
  var index = (percentile/100) * data.length;
  var result;
  if (Math.floor(index) == index) {
       result = (data[(index-1)] + data[index])/2;
  }
  else {
      result = data[Math.floor(index)];
  }
  return result;
}
//because .sort() doesn't sort numbers correctly
function numSort(a,b) { 
  return a - b; 
} 

function getBoxValues(data) {
  var boxValues = {};
  boxValues.low    = Math.min.apply(Math,data);
  boxValues.q1     = getPercentile(data, 25);
  boxValues.median = data.reduce((acc,v,i,a)=>(acc+v/a.length),0).toFixed(2)
  boxValues.q3     = getPercentile(data, 75);
  boxValues.high   = Math.max.apply(Math,data);
  return boxValues;
}


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
          getBoxValues(props.data)
        ],
        tooltip: {
            headerFormat: '<em>Experiment No {point.key}</em><br/>'
        }
    },
    {
      type: 'line',
      data: [props.you],
      marker: {
        radius: 8
      }
    } ,
    ]
    })
  }, [props.data])

  return (<HighchartsReact
    highcharts={Highcharts}
    options={options}
  />)
}
export default BoxPlot;