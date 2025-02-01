import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "./styles/App.css"; // Assuming you have a CSS file for styling

const MAPTILER_KEY = "oVRzjKK09DN6QHQFz2yG"; // Replace with your key

export default function MapView() {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

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

    newMap.on("load", () => {
      newMap.addControl(new maplibregl.NavigationControl(), "top-right"); // Zoom Controls
      newMap.addControl(new maplibregl.FullscreenControl(), "top-right"); // Fullscreen
      newMap.addControl(new maplibregl.ScaleControl(), "bottom-left"); // Scale bar

      // Add 3D Buildings
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
          minzoom: 14,
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["get", "render_height"],
              0,
              "gray",
              50,
              "steelblue",
              200,
              "lightblue",
            ],
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              14,
              0,
              16,
              ["get", "render_height"],
            ],
            "fill-extrusion-opacity": 0.8,
          },
        },
        "waterway-label"
      );

      newMap.dragRotate.disable(); // Stop auto rotation
      newMap.touchZoomRotate.disableRotation(); // Stop touch rotation

      setMap(newMap);
    });

    return () => newMap.remove();
  }, []);

  return <div className="map-container w-full h-full" ref={mapContainerRef}></div>;
}
