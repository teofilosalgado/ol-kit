import { GML, WFS } from "ol/format";

export default async function getFeatures(url, namespace, types, filter) {
  const featureRequest = new WFS().writeGetFeature({
    featureNS: namespace,
    featurePrefix: namespace,
    featureTypes: types,
    filter,
  });
  const payload = new XMLSerializer().serializeToString(featureRequest);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/xml" },
    body: payload,
  });
  const xml = await response.text();
  const features = new GML().readFeatures(xml);
  return features;
}
