/*
 * Class to handle the CLI interface
*/

const DEFAULT_SPV = ["a-hub1.odysee.com", 50001];

async function input(msg) {
  process.stdout.write(msg);
  for await (const line of console) {
    return line;
  }
}

async function options(question, opts) {
  let answer;

  while (!answer) {
    console.log(question);
    for (let i = 0; i < opts.length; i++) console.log(`${i+1}. ${opts[i]}`);

    answer = await input("Answer: ");

    if (isNaN(answer) || (answer < 1 || answer > opts.length)) {
      console.log("\nInvalid input!\n");
      answer = null;
    }
  }

  console.log("");

  return parseInt(answer);
}

export default class Cli {

  constructor(client) {
    this.client = client;

    // this.start();
  }

  async start() {
    this.server = await this.askServer();

    await this.client.connect(this.server);
    await this.client.ping();

    this.mainLoop();
  }

  async askServer() {
    let server;

    server = await options("Which SPV server should be used?", [`Default (${DEFAULT_SPV.join(':')})`, "Custom"]);

    if (server === 1) return DEFAULT_SPV;
    server = null;

    while (!server) {
      let resp = await input("Choose an SPV server: ");
      resp = resp.split(':');
      if (resp.length !== 2 || isNaN(resp[1])) continue;
      resp[1] = parseInt(resp[1]);

      server = resp;
    }

    return server;  
  }

  async mainLoop() {
    let cmd;
    while (true) {
      cmd = (await input("Send command: ")).split(' ');
      const method = cmd[0];

      const params = cmd.length > 1 ? cmd.shift() && cmd : [];

      console.log(await this.client.sendRequest(method, params));
    }
  }

}
