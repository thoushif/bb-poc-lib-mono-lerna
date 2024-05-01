import MockAdapter from "axios-mock-adapter";
import { Request } from "../../src/fiserv/request";
import axios from "axios";

let mock = new MockAdapter(axios);

describe("Request", () => {
  it("should successfully make a GET request", async () => {
    const request = new Request("https://example.com", {
      "Content-Type": "application/json",
    });
    // Mock the GET request
    mock
      .onGet("https://example.com/test-endpoint")
      .replyOnce(200, { data: "success" });

    const response = await request.get("test-endpoint");
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ data: "success" });
  });
});
