import { useContext, useEffect, useRef } from "react";
import Geometry from "ol/geom/Geometry";
import { Snap as SnapInteraction } from "ol/interaction";
import VectorSource from "ol/source/Vector";
import { MapContext } from "../../../Context";

type Props = {
  source: VectorSource<Geometry>;
};

function Snap({ source }: Props) {
  const mapContext = useContext(MapContext);
  const interaction = useRef(
    new SnapInteraction({
      source,
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

export default Snap;
