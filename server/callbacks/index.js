const { docker } = require("../config");
const allImages = () => {
  console.log("This are all the images");
  return docker.listImages({ all: false }).then(images => {
    return images;
  });
};

module.exports = { allImages };
