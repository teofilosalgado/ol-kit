import { useContext, useEffect, useRef } from "react";
import { Select as SelectInteraction } from "ol/interaction";
import { SelectEvent } from "ol/interaction/Select";

import { MapContext } from "../../../Context";
import { FilterFunction } from "ol/interaction/Translate";

type Props = {
  onSelected?: (event: SelectEvent) => void;
  filter?: FilterFunction;
};

function Select({ onSelected, filter }: Props) {
  const mapContext = useContext(MapContext);
  const interaction = useRef(new SelectInteraction({ filter }));

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
