import React from "react";
import { MapContainer, TileLayer} from 'react-leaflet'
import {showDataOnMap} from '../Utility/utils';

const Map = ({countries,caseType,center,zoom}) => {
  // console.log(caseType);
  return (
    <div className="map">
      {/* <h3>Map div {center[1]} $ {zoom} </h3> */}
        <MapContainer center={center} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          

          {showDataOnMap(countries,caseType)}
        </MapContainer>
    </div>
  );
}

export default Map;