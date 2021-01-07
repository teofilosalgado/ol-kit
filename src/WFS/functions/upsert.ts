import { Feature } from "ol";
import Geometry from "ol/geom/Geometry";
import insert from "./insert";
import update from "./update";

export default async function upsert(
  url: string,
  namespace: string,
  type: string,
  features: Feature<Geometry>[],
  srsName?: string
) {
  if (features.length <= 0) {
    return [];
  }

  const featuresToUpdate = features.filter((feature) => feature.getId());
  const featuresToInsert = features.filter((feature) => !feature.getId());

  async function insertFeatureAndUpdateId(feature: Feature<Geometry>) {
    const id = await insert(url, namespace, type, [feature], srsName);
    if (id) {
      feature.setId(id[0]);
    }
    return id;
  }
  const insertFeatureAndUpdateIdPromises = featuresToInsert.map(
    insertFeatureAndUpdateId
  );
  const insertedIds = Promise.all(insertFeatureAndUpdateIdPromises);

  const totalUpdated = update(url, namespace, type, featuresToUpdate, srsName);
  return {
    insertedIds,
    totalUpdated
  };
}
