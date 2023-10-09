/*
 * Class that manages the SPV connection
*/

import Spv from "./Spv.js";

export default class Client {

  constructor(log=true, timeout=5) {
    this.timeout = timeout;
    this.running = false;
    this.log = log;
    this.keepAliveId;
  }

  async connect(server) {
    this.connection = new Spv(server, this.log, this.timeout);
    await this.connection.connect();
    this.running = true;
    this.keepAlive();
  }

  disconnect() {
    this.running = false;
    clearInterval(this.keepAliveId);
    this.connection.disconnect();
  }

  kill() {
    delete this.connection;
    delete this;
  }

  async ping() {
    const p = await this.connection.ping();
    console.log(`Latency to ${this.connection.server.join(':')} was ${p}ms.`);
    return p;
  }

  async sendRequest(method, params=[]) {
    const startTime = performance.now();
    const resp = this.connection.sendRequest(method, params);
    const endTime = performance.now();
    // this.responseTime = endTime - startTime;

    return resp;
  }

  async keepAlive() {
    try {
      this.keepAliveId = setInterval(async ()=>{
        // if (!this.running) return clearInterval(this.keepAliveId);
        await this.sendRequest('server.ping');
        // logger.info("sent keepalive ping");
      }, 1000 * 30);
    } catch (err) {
      logger.err(err);
    }
  }
}
