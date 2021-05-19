import React, { Component } from "react"
import GoogleMapReact from "google-map-react"

const AnyReactComponent = ({ text }) => <div>{text}</div>

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 40.728291,
      lng: -73.844612
    },
    zoom: 11
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="h-full rounded-lg">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCTXhYbpcJeSNe7UWNUhAswLzuUpMPYj4Q" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={40.728291}
            lng={-73.844612}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map
