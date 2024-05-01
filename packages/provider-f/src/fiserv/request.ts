import axios, { AxiosInstance } from "axios";

interface Response {
  status: number | null;
  body: any;
  error: any;
}

class Request {
  private baseUrl: string;
  private headers: object;
  private httpClient: AxiosInstance;

  constructor(
    baseUrl: string,
    headers: object = {},
    httpClient: AxiosInstance = axios
  ) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.httpClient = httpClient;
  }

  private async makeRequest(
    method: string,
    endpoint: string,
    body: any = null
  ): Promise<Response> {
    const url: string = `${this.baseUrl}/${endpoint}`;
    try {
      const options = {
        headers: this.headers,
        method,
        url,
        data: {},
      };
      if (body) options["data"] = body;

      const response = await this.httpClient(options);
      return { status: response.status, body: response.data, error: null };
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  setAuthorizationHeader(authorization: object): void {
    this.headers = { ...this.headers, ...authorization };
  }

  post(endpoint: string, body: any): Promise<Response> {
    return this.makeRequest("post", endpoint, body);
  }

  get(endpoint: string): Promise<Response> {
    return this.makeRequest("get", endpoint);
  }

  private handleError(error: any): Response {
    if (error.response) {
      return {
        status: error.response.status,
        body: error.response.data,
        error: null,
      };
    }
    return { status: null, body: null, error };
  }
}

export { Request, Response };
