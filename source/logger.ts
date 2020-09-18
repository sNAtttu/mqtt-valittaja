import { createLogger, format, transports } from "winston";
import * as winston from "winston";

export default class Logger {
  public static myFormat = format.printf((info) => {
    const isWarn = info.level.indexOf("warn") !== -1;
    const isError = info.level.indexOf("error") !== -1;
    const shouldColorMessage = isWarn || isError;
    const severityMessageColor = isWarn ? "warn" : "error";
    const magentaColorLevel = "silly";
    const blueColorLevel = "verbose";
    const colorizeMessage = format.colorize().colorize;
    const severityMessage = shouldColorMessage
      ? colorizeMessage(severityMessageColor, info.message)
      : info.message;

    return `${colorizeMessage(
      blueColorLevel,
      info.timestamp
    )} [${colorizeMessage(magentaColorLevel, info.label)}] ${
      info.level
    }: ${severityMessage}`;
  });

  public static createLogger(name: string): winston.Logger {
    const { combine, colorize, label, timestamp, prettyPrint, splat } = format;
    return createLogger({
      level: "debug",
      format: combine(
        colorize({ message: false, level: true }),
        label({
          label: `${name}`,
        }),
        timestamp(),
        prettyPrint(),
        splat(),
        this.myFormat
      ),
      transports: new winston.transports.Console(),
    });
  }
}
