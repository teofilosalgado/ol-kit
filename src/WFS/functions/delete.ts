import { Feature } from "ol";
import WFS from "ol/format/WFS";
import Geometry from "ol/geom/Geometry";

export default async function deleteFeatures(
  url: string,
  namespace: string,
  type: string,
  features: Feature<Geometry>[],
  srsName?: string
): Promise<number | undefined> {
  if (features.length <= 0) {
    return 0;
  }
  const formatWFS = new WFS();

  const updateRequest = formatWFS.writeTransaction([], [], features, {
    featureNS: namespace,
    featurePrefix: namespace,
    featureType: type,
    nativeElements: [],
    srsName
  });
  const payload = new XMLSerializer().serializeToString(updateRequest);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/xml" },
    body: payload
  });
  const xml = await response.text();

  const result = formatWFS.readTransactionResponse(xml);
  if (result && (result as any).transactionSummary) {
    return (result as any).transactionSummary.totalDeleted;
  } else {
    return 0;
  }
}
