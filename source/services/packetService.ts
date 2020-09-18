import { IPacket, IConnackPacket, generate } from "mqtt-packet";
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
        const packetContents: IConnackPacket = {
          cmd: "connack",
          returnCode: 0,
          sessionPresent: false,
        };
        const responsePacket = generate(packetContents);
        websocketInstance.send(responsePacket);
        break;
      default:
        break;
    }
  }
}
