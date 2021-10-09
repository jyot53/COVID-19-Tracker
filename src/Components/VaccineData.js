import React , {useEffect,useState} from 'react'
import vaccine_data from '../Utility/cowin_vaccine_data_state.json';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "DD/MM/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            // Include a dollar sign in the ticks
            beginAtZero: true,
            callback: function (value, index, values) {
              return `#${value}`;
            },
          },
        },
      ],
    },
  };


const buildChartData = (stateArray)=>{

    let chartData = [];
    let lastDataPoint;
    stateArray.map((object)=>{
        if(lastDataPoint){
            const newDataPoint = {
                x : object.date,
                y : object.totalDoses - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = object.totalDoses;
    })
    return chartData;
}

const VaccineData = ({state}) => {

    const [data, setData] = useState([])
    useEffect(()=>{
       const filterArray = vaccine_data.filter((object)=> object.State === state );
       const chartData = buildChartData(filterArray);
        setData(chartData);
    },[state]);

    return (
        <>
          <h1>Vaccination Data of India (State-Wise)</h1>
          <div>
          <Line    
            data={{
            datasets:[{
                backgroundColor : "rgba(204,16,52,0.5)",
                borderColor: "#CC1034",     
                data:data               
                }]
            }} 
            options = {options} 
           />
        </div>  
        </>
    )
}

export default VaccineData


// {data?.length>0  && (
//     <Line    
//       data={{
//           datasets:[{
//               backgroundColor : "rgba(204,16,52,0.5)",
//               borderColor: "#CC1034",     
//               data:data               
//           }]
//       }} 
//       options = {options} 
//     />
// )}