import React, { ReactNode, useEffect, useRef } from "react";
import { Map as OpenLayersMap, MapBrowserEvent } from "ol";
import View from "./View";
import Toolbar from "./Toolbar";
import Layer from "./Layer";
import Interaction from "./Interaction";
import Overlay from "./Overlay";
import { MapProvider } from "../Context";
import style from "./index.module.css";

type Props = {
  children: ReactNode;
  height: string;
  width: string;
  onSingleClick?: (event: MapBrowserEvent<UIEvent>) => void;
};

function Map({ children, height, width, onSingleClick }: Props) {
  const map = useRef(new OpenLayersMap({}));

  useEffect(() => {
    map.current.setTarget("map");
    if (onSingleClick) {
      map.current.on("singleclick", onSingleClick);
    }
  });

  return (
    <MapProvider value={{ map }}>
      <div id="map" className={style.map} style={{ height, width }}>
        {children}
      </div>
    </MapProvider>
  );
}

Map.View = View;
Map.Toolbar = Toolbar;
Map.Layer = Layer;
Map.Interaction = Interaction;
Map.Overlay = Overlay;

export default Map;
