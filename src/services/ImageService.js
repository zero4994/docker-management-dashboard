import { docker } from "./config";

export const allImages = async function() {
  console.log("Querying all images...");
  const images = await docker.listImages({ all: false });
  return groupImagesByTag(images);
};

const groupImagesByTag = function(images) {
  /*
    Should group images by name and have the tags available
    [ { name: "ubuntu", 
        tags: { 
          "19.10": { containers, id, created }, 
          "18.04": { containers, id, created } }
    } ]
  */
  const imagesArray = [];
  const cache = {};

  images.forEach(element => {
    const name = element.RepoTags[0].split(":")[0];

    if (!cache[name]) {
      const image = {
        name,
        tags: {}
      };

      let currentElement;
      for (let i = 0; i < images.length; i++) {
        currentElement = images[i];
        const [currentName, currentTag] = currentElement.RepoTags[0].split(":");
        if (currentName === name) {
          image.tags[currentTag] = currentElement;
        }
      }
      cache[name] = 1;
      imagesArray.push(image);
    }
  });

  console.log("===>", imagesArray);
  return imagesArray;
};

export const removeImage = async function(id) {
  console.log("Removing image:", id);
  const image = docker.getImage(id);
  const result = await image.remove();
  console.log("Result: ", result);
  console.log("image ==>", image);
};
