import { useRef } from "react";
import { Map as OpenLayersMap } from "ol";
import { MapProvider } from "../Context";

import View from "./View";
import Toolbar from "./Toolbar";
import Layer from "./Layer";
import Interaction from "./Interaction";

import "./index.css";

function Map({ children, height, width }) {
  const map = useRef(new OpenLayersMap());

  return (
    <MapProvider value={{ map: map }}>
      <div id="map" style={{ height, width }}>
        {children}
      </div>
    </MapProvider>
  );
}

Map.View = View;
Map.Toolbar = Toolbar;
Map.Layer = Layer;
Map.Interaction = Interaction;

export default Map;
