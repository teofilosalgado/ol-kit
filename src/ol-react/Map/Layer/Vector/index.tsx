import { useEffect, useContext, useRef, useCallback } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Geometry from "ol/geom/Geometry";

import { MapContext } from "../../../Context";
import { StyleLike } from "ol/style/Style";

type Props = {
  source: VectorSource<Geometry>;
  style: StyleLike;
  fit?: boolean;
};

function Vector({ source, style, fit }: Props) {
  const mapContext = useContext(MapContext);
  const layer = useRef(
    new VectorLayer({
      source,
      style,
    })
  );

  useEffect(() => {
    mapContext.map?.current.addLayer(layer.current);

    return function cleanup() {
      mapContext.map?.current.removeLayer(layer.current);
    };
  });

  const fitOnAddOrChangeFeature = useCallback(
    (feature) => {
      if (fit && source.getFeatures()) {
        mapContext.map?.current.getView().fit(source.getExtent(), {
          size: mapContext.map?.current.getSize(),
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
