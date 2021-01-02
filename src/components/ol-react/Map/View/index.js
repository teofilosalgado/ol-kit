import { useEffect, useContext, useRef } from "react";
import { View as OpenLayersView } from "ol";

import { MapContext } from "../../Context";

function View({ options }) {
  const context = useContext(MapContext);
  const view = useRef(null);

  useEffect(() => {
    if (view.current === null) {
      view.current = new OpenLayersView(options);
      context.map.current.setTarget("map");
      context.map.current.setView(view.current);
    }
  });
  return null;
}

export default View;
