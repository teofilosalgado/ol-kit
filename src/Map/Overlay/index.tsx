import React, { useEffect, useContext, useRef, ReactNode } from "react";
import OpenLayersOverlay from "ol/Overlay";
import OverlayPositioning from "ol/OverlayPositioning";
import { Coordinate } from "ol/coordinate";
import { MapContext } from "../../Context";
import Popup from "./Popup";

type Props = {
  children: ReactNode;
  position: Coordinate;
};

function Overlay({ position, children }: Props) {
  const mapContext = useContext(MapContext);
  const elementRef = useRef(null);
  const overlayRef = useRef(
    new OpenLayersOverlay({
      positioning: OverlayPositioning.CENTER_CENTER,
      stopEvent: false,
      autoPan: true,
      autoPanAnimation: {
        duration: 500
      }
    })
  );

  useEffect(() => {
    if (!overlayRef.current.getElement()) {
      const element = elementRef.current;
      if (element) {
        overlayRef.current.setElement(element);
      }
    }
    mapContext.map?.current.addOverlay(overlayRef.current);
    return function cleanup() {
      mapContext.map?.current.removeOverlay(overlayRef.current);
    };
  });

  useEffect(() => {
    overlayRef.current.setPosition(position);
  }, [position]);

  return (
    <div id="overlay" ref={elementRef}>
      {children}
    </div>
  );
}

Overlay.Popup = Popup;

export default Overlay;
