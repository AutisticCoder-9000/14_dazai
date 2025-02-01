import React, { useRef } from "react";
import "./styles/App.css";

export default function SearchBar({ onSearch }) {
  const inputRef = useRef();

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = inputRef.current.value;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );

      const data = await response.json();
      if (data.length > 0) {
        const { lon, lat } = data[0];
        onSearch({ longitude: parseFloat(lon), latitude: parseFloat(lat) });
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="absolute top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg flex">
      <input
        type="text"
        ref={inputRef}
        placeholder="Search Bengaluru..."
        className="px-4 py-2 border rounded-md w-64"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}
