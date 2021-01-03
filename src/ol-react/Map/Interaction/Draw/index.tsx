import Geometry from "ol/geom/Geometry";
import GeometryType from "ol/geom/GeometryType";
import { Draw as DrawInteraction } from "ol/interaction";
import VectorSource from "ol/source/Vector";
import { useContext, useEffect, useRef } from "react";
import { MapContext } from "../../../Context";

type Props = {
  source: VectorSource<Geometry>;
  type: GeometryType;
};

function Draw({ source, type }: Props) {
  const mapContext = useContext(MapContext);
  const interaction = useRef(
    new DrawInteraction({
      source,
      type,
    })
  );

  useEffect(() => {
    mapContext.map?.current.addInteraction(interaction.current);

    return function cleanup() {
      mapContext.map?.current.removeInteraction(interaction.current);
    };
  });

  return null;
}

export default Draw;
