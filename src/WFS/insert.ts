import { Feature } from "ol";
import WFS from "ol/format/WFS";
import Geometry from "ol/geom/Geometry";

export default async function insertFeatures(
  url: string,
  namespace: string,
  type: string,
  features: Feature<Geometry>[]
) {
  if (features.length <= 0) {
    return [];
  }
  const formatWFS = new WFS();

  const insertRequest = formatWFS.writeTransaction(features, [], [], {
    featureNS: namespace,
    featurePrefix: namespace,
    featureType: type,
    nativeElements: []
  });
  const payload = new XMLSerializer().serializeToString(insertRequest);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/xml" },
    body: payload
  });
  const xml = await response.text();

  const result = formatWFS.readTransactionResponse(xml);
  const insertIds = result?.insertIds.map((item) =>
    parseInt(item.replace(`${type}.`, ""))
  );
  return insertIds;
}
