import crypto from "crypto";
import { generateHMAC } from "../utils/cryptoUtils";
import { Request } from "./request";
import { CLIENT_TOKEN, SANDBOX_CLIENT_TOKEN } from "../utils/constants";
import { Customer } from "../types/Customer";
class FiservApiClientError extends Error {}

/**
 * A client for interfacing with the Fiserv API
 * @class FiservClient
 */
class FiservApiClient {
  private host: string;
  private apiKey: string;
  private apiSecret: string;
  private request: Request;

  constructor(
    host: string,
    apiKey: string,
    apiSecret: string,
    useSandbox = false
  ) {
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
    this.request = new Request(this.host, {
      "Api-Key": this.apiKey,
      Timestamp: this.getTimestamp(),
      "Client-Request-Id": crypto.randomUUID(),
      "Client-Token": useSandbox ? SANDBOX_CLIENT_TOKEN : CLIENT_TOKEN,
      "Content-Type": "application/json",
    });
  }

  private getTimestamp(): number {
    return Date.now();
  }

  private getAuthorizationHeader(payload: object): object {
    return {
      Authorization: generateHMAC(
        this.apiKey,
        this.apiSecret,
        this.getTimestamp().toString(),
        JSON.stringify(payload)
      ),
    };
  }

  async createCustomer(customer: Customer): Promise<any> {
    if (!customer) {
      throw new FiservApiClientError(
        "External ID is required to create a customer."
      );
    }

    const payload = {
      customer: {
        externalId: customer.id,
      },
    };
    this.request.setAuthorizationHeader(this.getAuthorizationHeader(payload));
    console.log(JSON.stringify(payload, null, 2));
    return this.request.post("v1/customers", payload);
  }
}

export { FiservApiClient, FiservApiClientError };
