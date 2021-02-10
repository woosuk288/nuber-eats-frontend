import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps extends ICoords {
  $hover?: any;
}

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 35.255634, lng: 128.612937 });
  const [map, setMap] = useState<google.maps.Map>();
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
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      /* const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
        },
        (results, status) => {
          console.log(status, results);
        }
      ); */
    }
  }, [map, maps, driverCoords.lat, driverCoords.lng]);

  const onApiLoaded = ({ map, maps }: any) => {
    map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };

  const onGetRouteClick = () => {
    if (map) {
      const directionService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "#000",
          strokeOpacity: 0.7,
          strokeWeight: 7,
        },
      });
      directionsRenderer.setMap(map);
      directionService.route(
        {
          origin: {
            location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
          },
          destination: {
            location: new google.maps.LatLng(driverCoords.lat + 0.05, driverCoords.lng + 0.05),
          },
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result, status) => {
          console.log(result, status);
          directionsRenderer.setDirections(result);
        }
      );
    }
  };

  return (
    <div>
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
      <button onClick={onGetRouteClick}>Get Route</button>
    </div>
  );
};

const DriverIcon = ({ lat, lng }: IDriverProps) => {
  return <div className="text-lg">🚘</div>;
};
