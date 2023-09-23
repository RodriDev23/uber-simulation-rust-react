import React, { useState, useEffect } from 'react';
import ReactMapGL, { FullscreenControl, NavigationControl, Marker, Source, Layer, GeolocateControl } from 'react-map-gl';
import RandomRoutes from './RandomRoutes';
import { EndTravel } from './EndTravel';
import Chat from './Chat';
import { Drive } from './Drive';

interface MapUberProps {
  setEndTravel: React.Dispatch<React.SetStateAction<boolean>>;
}

function MapUber({ setEndTravel }: MapUberProps) {
  const randomStartLocation = RandomRoutes[Math.floor(Math.random() * RandomRoutes.length)];
  const randomEndLocation = RandomRoutes[Math.floor(Math.random() * RandomRoutes.length)];

  const [viewState, setViewState] = useState<any>({
    longitude: randomStartLocation.longitude,
    latitude: randomEndLocation.latitude,
    zoom: 15,
  });

  const [start, setStart] = useState([randomStartLocation.longitude, randomStartLocation.latitude]);
  const [end, setEnd] = useState([randomEndLocation.longitude, randomEndLocation.latitude]);
  const [coords, setCoords] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getRoute();
  }, [start, end]);

  const geojson: any = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: coords,
        },
      },
    ],
  };

  const lineStyle: any = {
    id: 'roadLayer',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': 'blue',
      'line-width': 7,
      'line-opacity': 0.90,
    },
  };

  const getRoute = async () => {
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?&geometries=geojson&access_token=yourkey`);
    const data = await response.json();
    const newCoords: string[] = data.routes[0].geometry.coordinates;
    setCoords(newCoords);
  };

  useEffect(() => {
    const speed = 0.1; // Adjust the speed as needed (in meters per second)
    const intervalTime = 800 / speed; // Calculate the interval time based on speed

    const interval = setInterval(() => {
      if (currentIndex < coords.length - 1) {
        setCurrentIndex(currentIndex + 1);
        const [longitude, latitude] = coords[currentIndex];
        setViewState({
          ...viewState,
          longitude,
          latitude,
          bearing: 360, // You can adjust the bearing for the car's rotation
        });
      }
      if (currentIndex === coords.length - 1) {
        setEndTravel(true);
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, coords, viewState]);

  const currentMarkerPosition = currentIndex < coords.length ? coords[currentIndex] : null;

  return (
    <div className='w-[100vw] h-[100vh] absolute flex flex-col justify-center items-center'>
      <ReactMapGL
        mapboxAccessToken="your key"
        {...viewState}
        mapStyle="your mapbox"
        onViewportChange={(nextViewState: any) => {
          setViewState(nextViewState);
        }}
      >
        <Source id='routeSource' type='geojson' data={geojson}>
          <Layer {...lineStyle} />
        </Source>
        <GeolocateControl />
        <NavigationControl />
        {currentMarkerPosition && (
          <Marker
            longitude={currentMarkerPosition[0]}
            latitude={currentMarkerPosition[1]}
            anchor='bottom'
            draggable={false}
          >
            <img src='https://png.pngtree.com/png-vector/20230110/ourmid/pngtree-car-top-view-image-png-image_6557068.png' className='w-20 transform rotate-180' alt="Car" />
          </Marker>
        )}
      </ReactMapGL>
      <div className="absolute mt-[600px] flex gap-3 ">
        <Chat />
        <Drive />
      </div>
    </div>
  );
}

export default MapUber;
