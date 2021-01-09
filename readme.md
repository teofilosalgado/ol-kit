# ol-kit

## What is it?

ol-kit is a React map component based in modern OpenLayers, designed to be fully integrated with React's lifecycle. ol-kit also includes utilities like buttons, toolbars and WFS-T functions.

[![NPM](https://img.shields.io/npm/v/ol-kit.svg)](https://www.npmjs.com/package/ol-kit) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add ol-kit
```

## Getting Started

Let's create a simple map!

```jsx
// Importing the library
import { Map } from "ol-kit";
import "ol-kit/dist/index.css";

// Import required OpenLayers types
import { XYZ as XYZSource } from "ol/source";

// Viewport options, according to https://openlayers.org/en/latest/apidoc/module-ol_View.html#~ViewOptions
const options = {
  projection: "EPSG:4326",
  center: [-43.990062, -19.873536],
  zoom: 6,
  minZoom: 5,
  maxZoom: 16
};

// Let's create a source for our basemap, in this case, Esri's World Imagery
const esriWorldImagerySource = new XYZSource({
  url:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
});

// Defining the map:
function App() {
  return (
    <Map height={"700px"} width={"100%"}>
      <Map.View options={options}></Map.View>

      {/* Add a layer using your recently created source */}
      <Map.Layer.Tile source={esriWorldImagerySource}></Map.Layer.Tile>
    </Map>
  );
}

export default App;
```

And... _voilà_, your map is up and running!

## Examples & documentation

You can find even more examples and help in our interactive documentation [here](https://teofilosalgado.github.io/ol-kit).

## Requirements

- `react >= 16.8.0`
- `ol >= 6.0.0`

## License

GNU GPL v3 © [teofilosalgado](https://github.com/teofilosalgado)
