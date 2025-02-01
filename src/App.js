import React from "react";
import MapView from "./MapView";
import SearchBar from "./SearchBar";

export default function App() {
  return (
    <div className="app-container w-screen h-screen relative">
      <SearchBar />
      <MapView />
    </div>
  );
}
