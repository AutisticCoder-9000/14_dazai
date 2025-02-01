import React, { useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = MAPBOX_TOKEN;

export default function SearchBar({ onSearch }) {
  const searchInput = useRef();

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchInput.current.value;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await response.json();
    if (data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      onSearch({ longitude: lng, latitude: lat, zoom: 12 });
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Search Bengaluru..."
        ref={searchInput}
      />
      <button type="submit">Search</button>
    </form>
  );
}