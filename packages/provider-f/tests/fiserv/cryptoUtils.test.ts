// cryptoUtils.test.ts
import { generateHMAC } from "../../src/utils/cryptoUtils";

describe("generateHMAC", () => {
  it("should generate a valid HMAC signature", () => {
    const apiKey = "testApiKey";
    const apiSecret = "testApiSecret";
    const timestamp = "123456789";
    const payload = JSON.stringify({ data: "test" });

    const signature = generateHMAC(apiKey, apiSecret, timestamp, payload);

    expect(signature).toBeDefined();
  });
});
