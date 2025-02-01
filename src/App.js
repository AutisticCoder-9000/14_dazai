import React, { useState, useMemo } from 'react';
import { DeckGL } from '@deck.gl/react';
import { PolygonLayer, HeatmapLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';
import buildings from './data/buildings.json'; // Replace with your GeoJSON
import uhiData from './data/uhi.json'; // Replace with your UHI data
import SearchBar from './SearchBar';

const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN'; // Replace with your token

const INITIAL_VIEW_STATE = {
  latitude: 12.9716, // Bengaluru coordinates
  longitude: 77.5946,
  zoom: 12,
  pitch: 45, // Tilt for 3D effect
  bearing: 0
};

export default function App() {
  const [viewport, setViewport] = useState(INITIAL_VIEW_STATE);

  // 3D Building Layer
  const buildingLayer = new PolygonLayer({
    id: 'buildings',
    data: buildings,
    extruded: true,
    wireframe: false,
    getElevation: d => d.properties.height || 10, // Use height property
    getPolygon: d => d.geometry.coordinates,
    getFillColor: [200, 200, 200], // Gray buildings
    pickable: true
  });

  // UHI Heatmap Layer
  const heatmapLayer = new HeatmapLayer({
    id: 'heatmap-layer',
    data: uhiData,
    getPosition: d => d.geometry.coordinates,
    getWeight: d => d.properties.temp, // Temperature drives intensity
    intensity: 0.5,
    radiusPixels: 50,
    threshold: 0.1
  });

  return (
    <DeckGL
      initialViewState={viewport}
      controller={true}
      layers={[buildingLayer, heatmapLayer]}
      onViewStateChange={e => setViewport(e.viewState)}
    >
      <StaticMap
        reuseMaps
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
      <SearchBar onSearch={(viewState) => setViewport(viewState)} />
    </DeckGL>
  );
}