import { useEffect, useContext, useRef } from "react";
import TileLayer from "ol/layer/Tile";

import { MapContext } from "../../../Context";

function Tile({ source }) {
  const mapContext = useContext(MapContext);
  const layer = useRef(
    new TileLayer({
      source,
    })
  );

  useEffect(() => {
    mapContext.map.current.addLayer(layer.current);
    return function cleanup() {
      mapContext.map.current.removeLayer(layer.current);
    };
  });
  return null;
}

export default Tile;
