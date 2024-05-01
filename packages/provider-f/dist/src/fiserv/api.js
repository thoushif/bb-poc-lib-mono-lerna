"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiservApiClientError = exports.FiservApiClient = void 0;
const crypto_1 = __importDefault(require("crypto"));
const cryptoUtils_1 = require("../utils/cryptoUtils");
const request_1 = require("./request");
const constants_1 = require("../utils/constants");
class FiservApiClientError extends Error {
}
exports.FiservApiClientError = FiservApiClientError;
/**
 * A client for interfacing with the Fiserv API
 * @class FiservClient
 */
class FiservApiClient {
    constructor(host, apiKey, apiSecret, useSandbox = false) {
        if (!host) {
            throw new FiservApiClientError("host is required");
        }
        if (!apiKey) {
            throw new FiservApiClientError("apiKey is required");
        }
        if (!apiSecret) {
            throw new FiservApiClientError("apiSecret is required");
        }
        this.host = host;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.request = new request_1.Request(this.host, {
            "Api-Key": this.apiKey,
            Timestamp: this.getTimestamp(),
            "Client-Request-Id": crypto_1.default.randomUUID(),
            "Client-Token": useSandbox ? constants_1.SANDBOX_CLIENT_TOKEN : constants_1.CLIENT_TOKEN,
            "Content-Type": "application/json",
        });
    }
    getTimestamp() {
        return Date.now();
    }
    getAuthorizationHeader(payload) {
        return {
            Authorization: (0, cryptoUtils_1.generateHMAC)(this.apiKey, this.apiSecret, this.getTimestamp().toString(), JSON.stringify(payload)),
        };
    }
    createCustomer(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!customer) {
                throw new FiservApiClientError("External ID is required to create a customer.");
            }
            const payload = {
                customer: {
                    externalId: customer.id,
                },
            };
            this.request.setAuthorizationHeader(this.getAuthorizationHeader(payload));
            console.log(JSON.stringify(payload, null, 2));
            return this.request.post("v1/customers", payload);
        });
    }
}
exports.FiservApiClient = FiservApiClient;
