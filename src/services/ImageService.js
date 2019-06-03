import { docker } from "./config";

export const allImages = async function() {
  try {
    console.log("Querying all images...");
    const images = await docker.listImages({ all: false });
    console.log("Images: ", images);
    return images;
  } catch (error) {
    console.error(error);
    this.$dialog.message.error(error.toString(), { position: "top" });
  }
  return [];
};
