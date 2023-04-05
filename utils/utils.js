const util = require("util");
const exec = util.promisify(require("child_process").exec);

const checkPort = async (port) => {
  const detais = await exec("bash bash/checkport.sh " + port);
  if (detais.stderr) {
    return { status: false, message: "bash error" };
  } else if (detais.stdout === "not-running") {
    return { status: true, message: "port is not running" };
  } else {
    return { status: false, message: "port is running!" };
  }
};

const runClientOnPort = async (port, servername) => {
  const detais = await exec(`bash bash/run.sh ${port} ${servername}`);
  console.log(detais);
  if (detais.stderr) {
    return { status: false, message: "bash error" };
  } else {
    return { status: true, message: "server is running" };
  }
};

module.exports = { checkPort, runClientOnPort };
