import React from "react";
import GoogleMapReact from "google-map-react";

export const Dashboard = () => {
  const position = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  return (
    <div className="overflow-hidden" style={{ width: window.innerWidth, height: "95vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBiDJ6FwMCrCTL9Is6GyT3F0OAaSgBp_7Y" }}
        defaultCenter={position.center}
        defaultZoom={position.zoom}
      >
        <div>Hello yo</div>
        {/* <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          /> */}
      </GoogleMapReact>
    </div>
  );
};
