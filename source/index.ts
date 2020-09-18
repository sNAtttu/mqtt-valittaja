import WebSocket, { Server } from "ws";
import Logger from "./logger";
import PacketService from "./services/packetService";
import { IPacket, parser } from "mqtt-packet";

const logger = Logger.createLogger("main");
const packetParser = parser({ protocolVersion: 5 });
const packetService = new PacketService();

const server = new Server({ port: 8080 });

let webSocketInstance: WebSocket;
// Synchronously emits all the parsed packets
packetParser.on("packet", (packet: IPacket) => {
  packetService.receivePacket(packet, webSocketInstance);
});

server.on("connection", (socket: WebSocket) => {
  socket.on("message", (messageBuffer: Buffer) => {
    webSocketInstance = socket;
    packetParser.parse(messageBuffer);
  });
});
