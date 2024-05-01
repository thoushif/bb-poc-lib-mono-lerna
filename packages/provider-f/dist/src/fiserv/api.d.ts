import { Customer } from "../types/Customer";
declare class FiservApiClientError extends Error {
}
/**
 * A client for interfacing with the Fiserv API
 * @class FiservClient
 */
declare class FiservApiClient {
    private host;
    private apiKey;
    private apiSecret;
    private request;
    constructor(host: string, apiKey: string, apiSecret: string, useSandbox?: boolean);
    private getTimestamp;
    private getAuthorizationHeader;
    createCustomer(customer: Customer): Promise<any>;
}
export { FiservApiClient, FiservApiClientError };
