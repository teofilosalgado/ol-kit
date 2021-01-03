import { ReactNode, useEffect, useRef } from "react";
import { Map as OpenLayersMap } from "ol";
import View from "./View";
import Toolbar from "./Toolbar";
import Layer from "./Layer";
import Interaction from "./Interaction";
import { MapProvider } from "../Context";
import "./index.css";

type Props = {
  children: ReactNode;
  height: string;
  width: string;
};

function Map({ children, height, width }: Props) {
  const map = useRef(new OpenLayersMap({}));

  useEffect(() => {
    map.current.setTarget("map");
  });

  return (
    <MapProvider value={{ map }}>
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
