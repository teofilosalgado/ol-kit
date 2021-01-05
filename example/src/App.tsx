import React, { useCallback, useEffect, useState } from "react";
import { Vector as VectorSource } from "ol/source";
import { XYZ as XYZSource, TileWMS as TileWMSSource } from "ol/source";
import { equalTo } from "ol/format/filter";
import {
  Fill as FillStyle,
  Stroke as StrokeStyle,
  Icon as IconStyle,
  Style
} from "ol/style";

import { Map, WFS } from "ol-react";
import praga from "./praga.png";
import anotacao from "./anotacao.png";
import IconAnchorUnits from "ol/style/IconAnchorUnits";
import GeometryType from "ol/geom/GeometryType";
import { SelectEvent } from "ol/interaction/Select";
import { DrawEvent } from "ol/interaction/Draw";

import 'ol-react/dist/index.css'

const ARCGIS_WORLD_IMAGERY_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const GEOSERVER_URL = "http://159.65.216.107:8088/geoserver/agro";
const GEOSERVER_WMS_URL = `${GEOSERVER_URL}/wms`;
const GEOSERVER_WFS_URL = `${GEOSERVER_URL}/wfs`;

/* FONTES */
const esriWorldImagery = new XYZSource({
  url: ARCGIS_WORLD_IMAGERY_URL
});

const estadoLayer = new TileWMSSource({
  url: GEOSERVER_WMS_URL,
  params: { LAYERS: "agro:estado", TILED: true }
});

const imovelSource = new VectorSource();
const drawTalhaoSource = new VectorSource();
const drawPragaSource = new VectorSource();
const drawAnotacaoSource = new VectorSource();

/* ESTILOS */
const imovelStyle = new Style({
  stroke: new StrokeStyle({
    color: "#ffff00",
    width: 5,
    lineDash: [10, 10]
  })
});

const talhaoStyle = new Style({
  fill: new FillStyle({
    color: "rgba(51, 136, 255, 0.2)"
  }),
  stroke: new StrokeStyle({
    color: "#3388ff",
    width: 2
  })
});

const pragaStyle = new Style({
  image: new IconStyle({
    anchor: [0.5, 37],
    anchorXUnits: IconAnchorUnits.FRACTION,
    anchorYUnits: IconAnchorUnits.PIXELS,
    src: praga
  })
});

const anotacaoStyle = new Style({
  image: new IconStyle({
    anchor: [0.5, 37],
    anchorXUnits: IconAnchorUnits.FRACTION,
    anchorYUnits: IconAnchorUnits.PIXELS,
    src: anotacao
  })
});

/* CONFIGURAÇÕES */
const options = {
  projection: "EPSG:4326",
  center: [-43.990062, -19.873536],
  zoom: 6,
  minZoom: 5,
  maxZoom: 16
};

function App() {
  const [currentDrawing, setCurrentDrawing] = useState(-1);

  const changeCurrentDrawing = useCallback(
    (current) => {
      if (currentDrawing === current) {
        setCurrentDrawing(-1);
      } else {
        setCurrentDrawing(current);
      }
    },
    [currentDrawing]
  );

  useEffect(() => {
    async function init() {
      const wfsFeatures = await WFS.get(
        GEOSERVER_WFS_URL,
        "agro",
        ["fazenda"],
        equalTo("cod_imovel", "MG-3108008-AAEEAB404821459BB17C92EB0C235B5E")
      );
      imovelSource.addFeatures(wfsFeatures);
    }
    init();
  });

  async function salvar() {
    const talhaoIDs = await WFS.insert(
      GEOSERVER_WFS_URL,
      "agro",
      "talhao",
      drawTalhaoSource.getFeatures()
    );
    const pragaIDs = await WFS.insert(
      GEOSERVER_WFS_URL,
      "agro",
      "praga",
      drawPragaSource.getFeatures()
    );
    const anotacaoIDs = await WFS.insert(
      GEOSERVER_WFS_URL,
      "agro",
      "anotacao",
      drawAnotacaoSource.getFeatures()
    );
    console.log(talhaoIDs);
    console.log(pragaIDs);
    console.log(anotacaoIDs);
  }

  function onSelected(element: SelectEvent) {
    element.selected.forEach((item) => {
      switch (item.getGeometry()?.getType()) {
        case "Point":
          try {
            drawPragaSource.removeFeature(item);
          } catch (error) {}
          try {
            drawAnotacaoSource.removeFeature(item);
          } catch (error) {}
          break;
        case "Polygon":
          drawTalhaoSource.removeFeature(item);
          break;
        default:
          break;
      }
    });
  }

  function onDrawPragaEnd(event: DrawEvent) {
    console.log("praga", event);
  }

  function onDrawAnotacaoEnd(event: DrawEvent) {
    console.log("anotacao", event);
  }

  return (
    <div>
      <Map height={"100vh"} width={"100vw"}>
        <Map.Toolbar>
          <Map.Toolbar.Button
            active={currentDrawing === 0}
            onClick={() => {
              changeCurrentDrawing(0);
            }}
            tooltip={"Desenhar talhão"}
            icon={"A"}
          ></Map.Toolbar.Button>
          <Map.Toolbar.Button
            active={currentDrawing === 1}
            onClick={() => {
              changeCurrentDrawing(1);
            }}
            tooltip={"Demarcar praga"}
            icon={"B"}
          ></Map.Toolbar.Button>
          <Map.Toolbar.Button
            active={currentDrawing === 2}
            onClick={() => {
              changeCurrentDrawing(2);
            }}
            tooltip={"Demarcar anotação"}
            icon={"C"}
          ></Map.Toolbar.Button>
          <Map.Toolbar.Button
            active={currentDrawing === 3}
            onClick={() => {
              changeCurrentDrawing(3);
            }}
            tooltip={"Excluir geometrias"}
            icon={"D"}
          ></Map.Toolbar.Button>
          <Map.Toolbar.Button
            active={false}
            onClick={salvar}
            tooltip={"Salvar"}
            icon={"E"}
          ></Map.Toolbar.Button>
        </Map.Toolbar>

        <Map.View options={options}></Map.View>

        <Map.Layer.Tile source={esriWorldImagery}></Map.Layer.Tile>
        <Map.Layer.Tile source={estadoLayer}></Map.Layer.Tile>

        <Map.Layer.Vector
          source={imovelSource}
          style={imovelStyle}
          fit={true}
        ></Map.Layer.Vector>

        <Map.Layer.Vector
          source={drawTalhaoSource}
          style={talhaoStyle}
        ></Map.Layer.Vector>
        <Map.Layer.Vector
          source={drawPragaSource}
          style={pragaStyle}
        ></Map.Layer.Vector>
        <Map.Layer.Vector
          source={drawAnotacaoSource}
          style={anotacaoStyle}
        ></Map.Layer.Vector>

        {currentDrawing === 0 && (
          <>
            <Map.Interaction.Draw
              source={drawTalhaoSource}
              type={GeometryType.POLYGON}
            ></Map.Interaction.Draw>
            <Map.Interaction.Modify
              source={drawTalhaoSource}
            ></Map.Interaction.Modify>
          </>
        )}
        {currentDrawing === 1 && (
          <>
            <Map.Interaction.Draw
              source={drawPragaSource}
              type={GeometryType.POINT}
              onDrawEnd={onDrawPragaEnd}
            ></Map.Interaction.Draw>
            <Map.Interaction.Modify
              source={drawPragaSource}
            ></Map.Interaction.Modify>
          </>
        )}
        {currentDrawing === 2 && (
          <>
            <Map.Interaction.Draw
              source={drawAnotacaoSource}
              type={GeometryType.POINT}
              onDrawEnd={onDrawAnotacaoEnd}
            ></Map.Interaction.Draw>
            <Map.Interaction.Modify
              source={drawAnotacaoSource}
            ></Map.Interaction.Modify>
          </>
        )}
        {currentDrawing === 3 && (
          <Map.Interaction.Select
            onSelected={onSelected}
          ></Map.Interaction.Select>
        )}
      </Map>
    </div>
  );
}

export default App;
