import { Select as SelectInteraction } from "ol/interaction";
import { SelectEvent } from "ol/interaction/Select";
import { useContext, useEffect, useRef } from "react";
import { MapContext } from "../../../Context";

type Props = {
  onSelected?: (event: SelectEvent) => void;
};

function Select({ onSelected }: Props) {
  const mapContext = useContext(MapContext);
  const interaction = useRef(new SelectInteraction({}));

  useEffect(() => {
    if (onSelected) {
      interaction.current.on("select", onSelected);
    }
    mapContext.map?.current.addInteraction(interaction.current);

    return function cleanup() {
      mapContext.map?.current.removeInteraction(interaction.current);
    };
  });

  return null;
}

export default Select;
