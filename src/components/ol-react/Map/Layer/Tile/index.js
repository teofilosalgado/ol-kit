import { useEffect, useContext, useRef } from "react";
import TileLayer from "ol/layer/Tile";

import { MapContext } from "../../../Context";

function Tile({ source }) {
  const mapContext = useContext(MapContext);
  const currentSource = useRef(null);
  const layer = useRef(null);

  useEffect(() => {
    if (
      currentSource.current === null ||
      currentSource.current.ol_uid !== source.ol_uid
    ) {
      currentSource.current = source;
      layer.current = new TileLayer({
        source,
      });
      mapContext.map.current.addLayer(layer.current);
    }
  });
  return null;
}

export default Tile;
