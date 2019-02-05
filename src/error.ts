export class ChargifyApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    // Chargify usually returns a list of error messages in the response body.
    public errors?: string[],
  ) {
    super(message);
  }
}
