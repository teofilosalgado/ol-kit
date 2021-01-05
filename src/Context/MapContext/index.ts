import { Map } from "ol";
import React, { MutableRefObject } from "react";

type ContextProps = {
  map?: MutableRefObject<Map>;
};

const MapContext = React.createContext<ContextProps>({});

export const MapProvider = MapContext.Provider;
export const MapConsumer = MapContext.Consumer;

export default MapContext;
