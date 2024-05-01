import { v4 as uuidv4 } from "uuid";

class ApiError extends Error {}

/**
 * A client for interfacing with the  API
 * @class Client
 */
class ApiClient {
  private host: string;
  private useSandbox: boolean;

  constructor(host: string, useSandbox = false) {
    if (!host) {
      throw new ApiError("host is required");
    }

    this.host = host;
    this.useSandbox = useSandbox;
  }

  async createCustomer(name: string): Promise<any> {
    if (!name) {
      throw new ApiError("Name is required to create a customer.");
    }

    const response = {
      customer: {
        id: uuidv4(),
        name: name + "!",
      },
    };
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, 1000);
    });
  }
}

export { ApiClient, ApiError };
