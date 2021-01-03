import GML from "ol/format/GML3";
import WFS from "ol/format/WFS";
import Filter from "ol/format/filter/Filter";

export default async function getFeatures(
  url: string,
  namespace: string,
  types: string[],
  filter: Filter
) {
  const getRequest = new WFS().writeGetFeature({
    featureNS: namespace,
    featurePrefix: namespace,
    featureTypes: types,
    filter,
  });
  const payload = new XMLSerializer().serializeToString(getRequest);
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/xml" },
    body: payload,
  });
  const xml = await response.text();
  const features = new GML().readFeatures(xml);
  return features;
}
