import * as crypto from "crypto";

export function generateHMAC(
  apiKey: string,
  apiSecret: string,
  timestamp: string,
  payload: string
): string {
  const SEPARATOR = ":";
  const HMAC_PREFIX = "HMAC";
  const HASH_ALGORITHM = "sha256";
  const BASE64 = "base64";

  function hashPayload(body: string): string {
    return body
      ? crypto.createHash(HASH_ALGORITHM).update(body).digest(BASE64)
      : "";
  }

  function signMessage(
    apiKey: string,
    apiSecret: string,
    timestamp: string,
    hashedPayload: string
  ): string {
    const signatureRawData =
      apiKey + SEPARATOR + timestamp + SEPARATOR + hashedPayload;
    const algorithm = HASH_ALGORITHM;
    return crypto
      .createHmac(algorithm, apiSecret)
      .update(signatureRawData)
      .digest(BASE64);
  }

  const hashedPayload = hashPayload(payload);
  const signature = signMessage(apiKey, apiSecret, timestamp, hashedPayload);
  return HMAC_PREFIX + " " + signature;
}
