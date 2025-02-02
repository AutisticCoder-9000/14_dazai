

# Urban 3D Heat Map for Indian Cities

This project visualizes various environmental layers, including **NDVI** (Normalized Difference Vegetation Index), **Land Surface Temperature (LST)**, and **Urban Heat Island (UHI)** effects, in a 3D interactive map. The visualization is powered by **Google Earth Engine** (GEE), **MapLibre GL**, and **GeoTIFFs**.

## Features

- **3D Map Visualization** of Bangalore and other Indian cities with interactive controls.
- **Layer Integration** for:
  - GeoTIFF imagery (customizable).
  - Land Surface Temperature (LST) for multiple cities (2023).
  - Urban Heat Island (UHI) effects.
  - 3D building models rendered with MapLibre GL.
- **Layer Toggle** functionality for easy control of visibility.
- **Color Gradients** (e.g., Viridis, Plasma) to enhance the map layer interpretation.

## Dataset Acquisition

The datasets used in this project were acquired through **Google Earth Engine (GEE)**. We used **Landsat 8 imagery** to analyze urban environments across Indian cities, focusing on Bangalore. The key datasets include:

- **NDVI (Normalized Difference Vegetation Index)**: A measure of vegetation health, derived from the Red (Band 4) and Near Infrared (Band 5) bands of Landsat 8.
- **LST (Land Surface Temperature)**: Obtained from the thermal infrared bands (Band 10) of Landsat 8, essential for understanding temperature variations in urban environments.
- **UHI (Urban Heat Island)**: The temperature difference between urban and rural areas, indicating heat retention in cities.

### Data Processing Steps

1. **Area of Interest (AOI)**: Defined using the FAO/GAUL dataset.
2. **Landsat 8 Imagery**: Data was processed to compute NDVI, LST, and other related variables.
3. **Preprocessing**: Cloud-masking and scaling factors were applied to the raw satellite data. Adjustments for emissivity variations based on vegetation fraction were made.
4. **Export**: Processed datasets (NDVI, LST, and UHI) were exported as **GeoTIFF** files for visualization.

## Key Formulas

### 1. **NDVI (Normalized Difference Vegetation Index)**

NDVI quantifies vegetation density and health:

\[
\text{NDVI} = \frac{(\text{NIR} - \text{RED})}{(\text{NIR} + \text{RED})}
\]

Where:
- **NIR** = Near-Infrared band value
- **RED** = Red band value

**NDVI values** range from -1 to +1, with:
- **+1** indicating healthy, dense vegetation.
- **0** indicating barren soil or sparse vegetation.
- **-1** indicating water bodies.

### 2. **UHI (Urban Heat Island)**

The UHI effect is calculated as the temperature difference between urban and rural areas:

\[
\text{UHI} = \text{LST}_{\text{urban}} - \text{LST}_{\text{rural}}
\]

Where:
- **LST\(_{\text{urban}}\)** = Land Surface Temperature in urban areas
- **LST\(_{\text{rural}}\)** = Land Surface Temperature in rural areas

### 3. **Land Surface Temperature (LST)**

LST is derived from the thermal infrared bands of satellite data using the formula:

\[
\text{LST} = \left( \frac{T_B}{1 + \lambda \cdot \left(\frac{T_B}{\rho}\right) \cdot \ln(\epsilon)} \right) - 273.15
\]

Where:
- **T_B** = Top of Atmosphere brightness temperature (from the thermal band)
- **λ** = Wavelength of emitted radiance
- **ρ** = Planck’s constant (1.438 × 10⁻² m·K)
- **ε** = Emissivity, which can be derived from NDVI.

### 4. **Fraction of Vegetation (FV)**

Vegetation fraction is derived from NDVI and is used in emissivity and LST calculations:

\[
\text{FV} = \left( \frac{\text{NDVI} - \text{NDVI}_{\text{min}}}{\text{NDVI}_{\text{max}} - \text{NDVI}_{\text{min}}} \right)^2
\]

Where:
- **NDVI_min** and **NDVI_max** are the minimum and maximum NDVI values for the area of interest.

### 5. **Emissivity (EM)**

Emissivity is estimated using the vegetation fraction (FV) and the following formula:

\[
\text{EM} = 0.004 \cdot \text{FV} + 0.986
\]

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bangalore-3d-map.git
   cd bangalore-3d-map
   ```

2. Ensure the server is running to serve the GeoTIFF files:
   - Start the server by running `server.py`:
     ```bash
     python server.py
     ```
   - The following layers will be available:
     - `http://localhost:8000/data/example.tif` for GeoTIFF data.
     - `http://localhost:8000/data/LST_Bangalore_2023.tif` for LST data.
     - `http://localhost:8000/data/UHI_Export_Bangalore_Urban.tif` for UHI data.

3. Obtain and configure the **MAPTILER_KEY**:
   - Register for a free API key at [MapTiler](https://www.maptiler.com/).
   - Add your key in the `index.html` file as specified.

4. Open the `index.html` file in a web browser to visualize the map.

## Usage

Once the page is loaded, you will see:
- **Control Panel**: Toggle visibility of different layers (GeoTIFF, LST, UHI, 3D buildings).
- **Legend**: Color gradient legends for each map layer, indicating heat distribution, vegetation, etc.
- **3D Buildings**: Option to display 3D models of buildings in Bangalore and other cities.

## Dependencies

- [MapLibre GL](https://maplibre.org/)
- [GeoTIFF.js](https://github.com/GeotiffJS/GeoTIFF.js)
- [Plotty](https://github.com/plottyjs/plotty)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Let me know if you need any further refinements!
