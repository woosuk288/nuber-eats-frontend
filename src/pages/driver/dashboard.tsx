import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

interface ICoords {
  lat: number;
  lng: number;
}

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 35.255634, lng: 128.612937 });

  const position = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 20,
  };

  const onSuccess = (position: GeolocationPosition) => {
    const {
      coords: { latitude, longitude },
    } = position;
    console.log(position);
    console.log(latitude, longitude);
    setDriverCoords({ lat: latitude, lng: longitude });
  };

  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };

  const onApiLoaded = ({ map, maps }: any) => {
    console.log(map);
    console.log(maps);
    setTimeout(() => {
      map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
    }, 2000);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("position");
      console.log(position);
    }, onError);
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  });

  return (
    <div className="overflow-hidden" style={{ width: window.innerWidth, height: "95vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBiDJ6FwMCrCTL9Is6GyT3F0OAaSgBp_7Y" }}
        defaultCenter={position.center}
        defaultZoom={position.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onApiLoaded}
      ></GoogleMapReact>
    </div>
  );
};
