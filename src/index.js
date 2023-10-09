/*
 * A simple SPV client that aims for easy integration primarily with LBRY Hub servers.
 * The codebase for the hub server: https://github.com/lbryio/hub
*/

import minimist from "minimist";
import Client from "./Client.js";
import Cli from "./Cli.js";

main();
async function main() {
  const args = minimist(Bun.argv);

  // Handle command directly with flags
  // Command structure: bin --server "serverAddress" command "command"
  if (args['server'] && args._.includes('command')) {
    const server = args['server'].split(':');
    const cmd = args._.splice(args._.indexOf('command')+1);

    const method = cmd[0];

    const params = cmd.length > 1 ? cmd.shift() && cmd : "";

    const client = new Client(false);
    await client.connect([server[0], parseInt(server[1])]);

    console.log(await client.sendRequest(method, params));

    client.disconnect();
    // client.kill();

    return ;
  }

  // Initialize the Client
  const client = new Client();

  // Initialize the CLI interface
  const cli = new Cli(client);

  console.log("|-------------------|");
  console.log("| Simple SPV Client |");
  console.log("|-------------------|\n");

  cli.start();
}