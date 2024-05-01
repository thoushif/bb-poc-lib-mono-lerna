import { ApiClient, ApiError } from "../src";

describe("ApiClient", () => {
  describe("createCustomer", () => {
    test("should create a customer successfully", async () => {
      // Arrange
      const apiClient = new ApiClient("example.com");

      // Act
      const customer = await apiClient.createCustomer("John");

      // Assert
      expect(customer).toEqual({
        customer: {
          id: expect.any(String),
          name: "John",
        },
      });
    });

    test("should throw an error if name is not provided", async () => {
      // Arrange
      const apiClient = new ApiClient("example.com");

      // Act
      try {
        await apiClient.createCustomer("");
        // Fail the test if the promise resolves successfully
        fail("Expected an error to be thrown");
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).message).toBe(
          "Name is required to create a customer."
        );
      }
    });
  });
});
