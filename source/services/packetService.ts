import {
  IPacket,
  IConnackPacket,
  generate,
  IPingrespPacket,
} from "mqtt-packet";
import * as winston from "winston";
import WebSocket from "ws";
import Logger from "../logger";
import ClientToServerTypes from "../types/clientToServerPacketTypes";

export default class PacketService {
  private logger: winston.Logger;
  constructor() {
    this.logger = Logger.createLogger("Packet Service");
  }

  receivePacket(mqttPacket: IPacket, websocketInstance: WebSocket) {
    switch (mqttPacket.cmd) {
      case ClientToServerTypes.CONNECT:
        this.logger.info("Client connected");
        const connackPacket = generate(this.buildConnackPacket());
        websocketInstance.send(connackPacket);
        break;
      case ClientToServerTypes.PINGREQ:
        this.logger.info("Client requested for ping");
        const pingRespPacket = generate(this.buildPingRespPacket());
        websocketInstance.send(pingRespPacket);
      default:
        break;
    }
  }

  private buildPingRespPacket(): IPingrespPacket {
    return {
      cmd: "pingresp",
    };
  }

  private buildConnackPacket(): IConnackPacket {
    return {
      cmd: "connack",
      returnCode: 0,
      sessionPresent: false,
    };
  }
}
