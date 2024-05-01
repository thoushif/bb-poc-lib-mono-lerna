"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHMAC = void 0;
const crypto = __importStar(require("crypto"));
function generateHMAC(apiKey, apiSecret, timestamp, payload) {
    const SEPARATOR = ":";
    const HMAC_PREFIX = "HMAC";
    const HASH_ALGORITHM = "sha256";
    const BASE64 = "base64";
    function hashPayload(body) {
        return body
            ? crypto.createHash(HASH_ALGORITHM).update(body).digest(BASE64)
            : "";
    }
    function signMessage(apiKey, apiSecret, timestamp, hashedPayload) {
        const signatureRawData = apiKey + SEPARATOR + timestamp + SEPARATOR + hashedPayload;
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
exports.generateHMAC = generateHMAC;
