import { docker } from "./config";

export const allVolumes = async function() {
  console.log("Querying all volumes");
  return await docker.listVolumes();
};
