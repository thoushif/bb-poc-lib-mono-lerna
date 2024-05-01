import { AxiosInstance } from "axios";
interface Response {
    status: number | null;
    body: any;
    error: any;
}
declare class Request {
    private baseUrl;
    private headers;
    private httpClient;
    constructor(baseUrl: string, headers?: object, httpClient?: AxiosInstance);
    private makeRequest;
    setAuthorizationHeader(authorization: object): void;
    post(endpoint: string, body: any): Promise<Response>;
    get(endpoint: string): Promise<Response>;
    private handleError;
}
export { Request, Response };
