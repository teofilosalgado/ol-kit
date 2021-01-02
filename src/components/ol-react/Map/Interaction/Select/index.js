import { Select as SelectInteraction } from "ol/interaction";
import { useContext, useEffect, useRef } from "react";
import { MapContext } from "../../../Context";

function Select({ onSelected, filter }) {
  const mapContext = useContext(MapContext);
  const interaction = useRef(null);

  useEffect(() => {
    interaction.current = new SelectInteraction({ filter });
    interaction.current.on("select", onSelected);
    mapContext.map.current.addInteraction(interaction.current);

    return function cleanup() {
      mapContext.map.current.removeInteraction(interaction.current);
    };
  });

  return null;
}

export default Select;
