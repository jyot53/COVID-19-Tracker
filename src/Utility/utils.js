import {Circle,Popup} from 'react-leaflet';
import React from 'react';
import numeral from 'numeral';

const caseTypeColors = {
    cases: {
      rgb: "#2127d9",
      multiplier: 150,
    },
    recovered: {
      rgb: "#7dd71d",
      multiplier: 180,
    },
    deaths: {
      rgb: "#d92121",
      multiplier: 220,
    },
  };

//sort the data based on number of cases in that country
export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        return (a.cases > b.cases ) ? -1 : 1;
    })

    return sortedData;
}
//draw circles on the map 
export const showDataOnMap = (data,caseType) => {
  // console.log(caseType);
   return data.map((country)=>{
        return (
            <Circle center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.5}
                color={caseTypeColors[caseType].rgb}
                fillColor={caseTypeColors[caseType].rgb}
                radius={Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier}
            >
            <Popup>
                <div className="info-container">
                  <div
                    className="info-flag"
                    style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                  ></div>
                  <div className="info-name">{country.country}</div>
                  <div className="info-confirmed">
                    Cases: {numeral(country.cases).format("0,0")}
                  </div>
                  <div className="info-recovered">
                    Recovered: {numeral(country.recovered).format("0,0")}
                  </div>
                  <div className="info-deaths">
                    Deaths: {numeral(country.deaths).format("0,0")}
                  </div>
                </div>
            </Popup>

            </Circle> 
             
        )
    })
}

  


            // <Marker position={position}>
            //     <Popup>
            //         A pretty CSS3 popup. <br /> Easily customizable.
            //     </Popup>
            // </Marker>