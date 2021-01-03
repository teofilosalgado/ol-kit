import Geometry from "ol/geom/Geometry";
import { Modify as ModifyInteraction } from "ol/interaction";
import VectorSource from "ol/source/Vector";
import { useContext, useEffect, useRef } from "react";
import { MapContext } from "../../../Context";

type Props = {
  source: VectorSource<Geometry>;
};

function Modify({ source }: Props) {
  const mapContext = useContext(MapContext);
  const interaction = useRef(
    new ModifyInteraction({
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

export default Modify;
