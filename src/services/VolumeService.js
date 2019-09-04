import { docker } from "./config";

export const allVolumes = async function() {
  console.log("Querying all volumes");
  const volumes = await docker.listVolumes();
  volumes.Volumes.sort((a, b) => {
    if (a.Name.toLowerCase() < b.Name.toLowerCase()) {
      return -1;
    } else if (a.Name.toLowerCase() > b.Name.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });
  return volumes;
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

export const pruneVolumes = async function() {
  console.log("Pruning volumes...");
  return await docker.pruneVolumes();
};
