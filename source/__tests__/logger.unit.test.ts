import Logger from "../logger";

describe("Logger", () => {
  it("should create new logger with specified name", () => {
    const testLogger = Logger.createLogger("test");
    const message = testLogger.info("test");
    const warnMessage = testLogger.warn("test");
    expect(message.level).toBe("debug");
    expect(warnMessage.level).toBe("debug");
    expect(testLogger).toBeDefined();
    expect(testLogger.transports.length).toBe(1);
  });
  it("should have custom format", () => {
    const customFormat = Logger.myFormat;
    expect(customFormat).toBeDefined();
  });
});
