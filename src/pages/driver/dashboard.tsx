import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

interface ICoords {
  lat: number;
  lng: number;
}

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 35.255634, lng: 128.612937 });
  const [map, setMap] = useState<any>();
  const [maps, setMaps] = useState<any>();

  const position = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 16,
  };

  const onSuccess = (position: GeolocationPosition) => {
    const {
      coords: { latitude, longitude },
    } = position;
    console.log(position);
    setDriverCoords({ lat: latitude, lng: longitude });
  };

  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  });

  useEffect(() => {
    if (map && maps) {
      map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
    }
  }, [map, maps, driverCoords.lat, driverCoords.lng]);

  const onApiLoaded = ({ map, maps }: any) => {
    map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };

  return (
    <div className="overflow-hidden" style={{ width: window.innerWidth, height: "50vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBiDJ6FwMCrCTL9Is6GyT3F0OAaSgBp_7Y" }}
        defaultCenter={position.center}
        defaultZoom={position.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onApiLoaded}
      >
        <DriverIcon lat={driverCoords.lat} lng={driverCoords.lng}></DriverIcon>
      </GoogleMapReact>
    </div>
  );
};

const DriverIcon = ({ lat, lng }: ICoords) => {
  return <div className="text-lg">🚘</div>;
};
