import { useEffect, useContext, useRef } from "react";
import { View as OpenLayersView } from "ol";

import { MapContext } from "../../Context";

function View({ options }) {
  const context = useContext(MapContext);
  const view = useRef(new OpenLayersView(options));

  useEffect(() => {
    context.map.current.setTarget("map");
    context.map.current.setView(view.current);

    return function cleanup() {
      context.map.current.setTarget(undefined);
      context.map.current.setView(undefined);
    };
  });
  return null;
}

export default View;
