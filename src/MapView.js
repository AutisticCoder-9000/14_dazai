import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { MapLibreSearchControl } from "@stadiamaps/maplibre-search-box";
import "@stadiamaps/maplibre-search-box/dist/style.css";
import "./styles/App.css";

const MAPTILER_KEY = "oVRzjKK09DN6QHQFz2yG"; 


export default function MapView() {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(14);

  const handleZoomIn = () => {
    if (map) {
      map.easeTo({ zoom: map.getZoom() + 1, duration: 300 });
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.easeTo({ zoom: map.getZoom() - 1, duration: 300 });
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const newMap = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
      center: [77.5946, 12.9716], // Bengaluru Coordinates
      zoom: 14,
      pitch: 45,
      bearing: 0,
      antialias: true,
    });

    const searchControl = new MapLibreSearchControl();
    newMap.addControl(searchControl, "top-right");

    newMap.on('zoom', () => {
      setCurrentZoom(Math.round(newMap.getZoom() * 10) / 10);
    });

    newMap.on("load", () => {
      // Get label layer ID
      const layers = newMap.getStyle().layers;
      let labelLayerId;
      for (const layer of layers) {
        if (layer.type === 'symbol' && layer.layout['text-field']) {
          labelLayerId = layer.id;
          break;
        }
      }

      // 🔹 Add 3D Buildings
      newMap.addSource("openmaptiles", {
        type: "vector",
        url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${MAPTILER_KEY}`,
      });
      newMap.addLayer(
        {
          id: "3d-buildings",
          source: "openmaptiles",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 12,
          maxZoom: 20,
          filter: ["!=", ["get", "hide_3d"], true],
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["get", "render_height"],
              12, "gray",
              16, "steelblue",
              18, "lightblue",
            ],
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              14, 10,
              16, ["get", "render_height"],
            ],
            "fill-extrusion-base": [
              "case",
              [">=", ["get", "zoom"], 16],
              ["get", "render_min_height"],
              0
            ],
            "fill-extrusion-opacity": 0.8,
          },
        },
        labelLayerId
      );
      // 🔹 Stop Auto Rotation
      newMap.dragRotate.disable();
      newMap.touchZoomRotate.disableRotation();
      setMap(newMap);
    });
    return () => newMap.remove();
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className="map-container" ref={mapContainerRef}></div>
      <div className="custom-zoom-controls">
        <button onClick={handleZoomIn} className="zoom-button">+</button>
        <button onClick={handleZoomOut} className="zoom-button">-</button>
      </div>
    </div>
  );
}