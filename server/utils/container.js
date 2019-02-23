const containerObjectParser = object => {
  if (!object.HostConfig) return object;

  const ports = parsePorts(object.HostConfig.PortBindings.port);
  object.HostConfig.PortBindings = ports;
  return object;
};

const parsePorts = ports => {
  console.log("ports to bind", ports);
  let portBind = {};
  ports.forEach(element => {
    portBind[element.name] = element.binding;
  });
  return portBind;
};

const readStream = (stream, socket, id) => {
  var header = null;

  stream.on("readable", () => {
    header = header || stream.read(8);
    while (header !== null) {
      var payload = stream.read(header.readUInt32BE(4));
      if (payload === null) break;
      socket.emit("logs", {
        id,
        message: payload.toString("utf8")
      });
      header = stream.read(8);
    }
  });
};

module.exports = { containerObjectParser, readStream };
