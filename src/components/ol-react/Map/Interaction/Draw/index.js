import { Draw as DrawInteraction } from "ol/interaction";
import { useContext, useEffect, useRef } from "react";
import { MapContext } from "../../../Context";

function Draw({ source, type }) {
  const mapContext = useContext(MapContext);
  const interaction = useRef(
    new DrawInteraction({
      source,
      type,
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

export default Draw;
