import { useEffect, useContext, useRef, useCallback } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Geometry from "ol/geom/Geometry";
import { StyleLike } from "ol/style/Style";

import { MapContext } from "../../../Context";

type Props = {
  source: VectorSource<Geometry>;
  style: StyleLike;
  fit?: boolean;
  name?: String;
};

function Vector({ source, style, fit, name }: Props) {
  const mapContext = useContext(MapContext);
  const layer = useRef(
    new VectorLayer({
      source,
      style
    })
  );

  useEffect(() => {
    layer.current.set("name", name);
    mapContext.map?.current.addLayer(layer.current);

    return function cleanup() {
      mapContext.map?.current.removeLayer(layer.current);
    };
  });

  const fitOnAddOrChangeFeature = useCallback(() => {
    if (fit && source.getFeatures()) {
      mapContext.map?.current.getView().fit(source.getExtent(), {
        size: mapContext.map?.current.getSize(),
        padding: [50, 50, 50, 50],
        duration: 2500
      });
    }
  }, [fit, mapContext, source]);

  source.on("addfeature", fitOnAddOrChangeFeature);
  source.on("changefeature", fitOnAddOrChangeFeature);
  return null;
}

export default Vector;
