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

module.exports = { containerObjectParser };
