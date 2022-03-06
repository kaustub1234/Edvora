import React from 'react'
import "./NearestRides.css"
const NearestRides = (props) => {
  const data = [...props.nearestRidesData];
  console.log(data);  
  return (
    <div className='NearestStationDetails'>
      {data.length!=0 && data.map((e, idx) => {
        const image = e.map_url;
        return (<div key={idx} className="NearestRide">
          <img src={image} />
          <div className="NearestRide_Details">
            <h4>Ride Id: {e.id}</h4>
            <h4>Origin Station: {e.origin_station_code}</h4>
            <h4>station_path: [{e.station_path.toString()}]</h4>
            <h4>Date: {e.date}</h4>
            <h4>Distance: {e.Distance}</h4>
          </div>
          <div className="NearestRide_location">
            <div className='location_state'>
              <h3>state</h3>
              <h4>{e.state}</h4>
            </div>
            <div className='location_city'>
              <h3>city</h3>
              <h4>{e.city}</h4>
            </div>
          </div>
        </div>)
      })}
      {data.length ==0 && <h1>No data found!!!</h1>}
    </div>
  )
}

export default NearestRides;