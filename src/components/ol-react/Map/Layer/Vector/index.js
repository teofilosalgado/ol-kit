import { useEffect, useContext, useRef, useCallback } from "react";
import VectorLayer from "ol/layer/Vector";

import { MapContext } from "../../../Context";

function Vector({ source, style, fit }) {
  const mapContext = useContext(MapContext);
  const layer = useRef(null);

  useEffect(() => {
    layer.current = new VectorLayer({
      source,
      style,
    });
    mapContext.map.current.addLayer(layer.current);

    return function cleanup() {
      mapContext.map.current.removeLayer(layer.current);
    };
  });

  const fitOnAddOrChangeFeature = useCallback(
    (feature) => {
      if (fit && source.getFeatures()) {
        mapContext.map.current.getView().fit(source.getExtent(), {
          size: mapContext.map.current.getSize(),
          padding: [50, 50, 50, 50],
          duration: 2500,
        });
      }
    },
    [fit, mapContext, source]
  );

  source.on("addfeature", fitOnAddOrChangeFeature);
  source.on("changefeature", fitOnAddOrChangeFeature);
  return null;
}

export default Vector;
