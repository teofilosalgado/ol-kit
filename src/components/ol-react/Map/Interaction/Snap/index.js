import { Snap as SnapInteraction } from "ol/interaction";
import { useContext, useEffect, useRef } from "react";
import { MapContext } from "../../../Context";

function Snap({ source }) {
  const mapContext = useContext(MapContext);
  const interaction = useRef(
    new SnapInteraction({
      source,
    })
  );

  useEffect(() => {
    mapContext.map.current.addInteraction(interaction.current);

    return function cleanup() {
      mapContext.map.current.removeInteraction(interaction.current);
    };
  });

  return null;
}

export default Snap;
