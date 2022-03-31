import React, { useEffect } from "react"
import { NextPage } from "next"
import Router from "next/router"

import mapboxgl from "mapbox-gl"
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl"

// const Map = ReactMapboxGl({
//   accessToken:
//     "pk.eyJ1IjoicGVycnlyYXNraW4iLCJhIjoiY2tvdXRscHh5MDBlaDJ2cG0wNGJnbml2eSJ9.WwSSb7bOp1T0JlWILpAANg"
// })

mapboxgl.accessToken =
  "pk.eyJ1IjoicGVycnlyYXNraW4iLCJhIjoiY2tvdXRscHh5MDBlaDJ2cG0wNGJnbml2eSJ9.WwSSb7bOp1T0JlWILpAANg"

interface Props {
  lat: number
  long: number
  zoom: number
}

// const MapBox: NextPage<Props> = ({}) => {
//   return (
//     <Map
//       style="mapbox://styles/mapbox/streets-v9"
//       //   containerStyle={{
//       //     height: "100vh",
//       //     width: "100vw"
//       //   }}
//       className="h-72 sm:h-full rounded-lg"
//       center={[-0.2416815, 51.5285582]}
//       zoom={[13]}
//     >
//       <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
//         <Feature coordinates={[-0.2416815, 51.5285582]} />
//       </Layer>
//       <Marker coordinates={[-0.2416815, 51.5285582]} anchor="bottom">
//         <img src={"https://i.imgur.com/VMS23hO.png"} />
//       </Marker>
//     </Map>
//   )
// }

const MapBox: NextPage<Props> = ({ lat, long, zoom }) => {
  useEffect(() => {
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", //stylesheet location
      center: [long, lat],
      zoom: zoom
    })

    map.addControl(new mapboxgl.FullscreenControl())

    var marker1 = new mapboxgl.Marker({ color: "black" })
      .setLngLat([long, lat])
      .addTo(map)
  }, [])
  return <div></div>
}

export default MapBox
