import { docker } from "./config";

export const allVolumes = async function() {
  console.log("Querying all volumes");
  return await docker.listVolumes();
};

export const createVolume = async function(name) {
  console.log("Creating volume with name", name);
  await docker.createVolume({ name });
};

export const removeVolume = async function(name) {
  console.log("Removing volume with name", name);
  const volume = await docker.getVolume(name);
  await volume.remove();
};
