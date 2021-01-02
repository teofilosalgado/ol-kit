import { GML, WFS } from "ol/format";
import { parse } from "ol/xml";

export default async function insertFeatures(url, namespace, type, features) {
  if (features.length <= 0) {
    return [];
  }
  const formatGML = new GML({
    featureNS: namespace,
    featureType: type,
  });
  const node = new WFS().writeTransaction(features, null, null, formatGML);
  const payload = new XMLSerializer().serializeToString(node);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/xml" },
    body: payload,
  });
  const xml = await response.text();

  const document = parse(xml);
  const elements = document.getElementsByTagName("ogc:FeatureId");
  const ids = Array.from(elements).map((item) =>
    parseInt(item.getAttribute("fid").replace(`${type}.`, ""))
  );
  return ids;
}
