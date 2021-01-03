import { useEffect, useContext, useRef } from "react";
import { View as OpenLayersView } from "ol";

import { MapContext } from "../../Context";
import { ViewOptions } from "ol/View";

type Props = {
  options: ViewOptions;
};

function View({ options }: Props) {
  const context = useContext(MapContext);
  const view = useRef(new OpenLayersView(options));

  useEffect(() => {
    context.map?.current.setView(view.current);
  });
  return null;
}

export default View;
