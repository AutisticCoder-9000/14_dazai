// import React, { useRef } from "react";

// export default function SearchBar({ map }) {
//   const inputRef = useRef();

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const query = inputRef.current.value;

//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
//       );

//       const data = await response.json();
//       if (data.length > 0) {
//         const { lon, lat } = data[0];

//         // Fly smoothly to the searched location
//         map.flyTo({
//           center: [parseFloat(lon), parseFloat(lat)],
//           zoom: 15, // Zoom to location
//           essential: true, // Makes animation smoother
//         });
//       }
//     } catch (error) {
//       console.error("Geocoding error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSearch} className="absolute top-4 left-4 z-50 bg-white p-3 rounded-lg shadow-md flex">
//       <input
//         type="text"
//         ref={inputRef}
//         placeholder="Search location..."
//         className="px-4 py-2 border rounded-md w-64"
//       />
//       <button
//         type="submit"
//         className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Search
//       </button>
//     </form>
//   );
// }
