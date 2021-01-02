import { Modify as ModifyInteraction } from "ol/interaction";
import { useContext, useEffect, useRef } from "react";
import { MapContext } from "../../../Context";

function Modify({ source }) {
  const mapContext = useContext(MapContext);
  const interaction = useRef(null);

  useEffect(() => {
    interaction.current = new ModifyInteraction({
      source,
    });
    mapContext.map.current.addInteraction(interaction.current);

    return function cleanup() {
      mapContext.map.current.removeInteraction(interaction.current);
    };
  });

  return null;
}

export default Modify;
