export class CustomError extends Error {
  public statusCode: number;
  public errors?: string[] | Record<string, any>;

  constructor(
    message: string = "An error occurred",
    statusCode: number = 500,
    errors: string[] | Record<string, any> | null = null
  ) {
    super(message);
    this.statusCode = statusCode;
    if (errors) this.errors = errors;

    // Set the prototype explicitly for extending built-in classes in TypeScript
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

// Function to throw a new CustomError
const customError = (
  errMsg: string | string[] | Record<string, any> = "",
  statusCode: number = 500
): never => {
  throw new CustomError(
    typeof errMsg === "string" ? errMsg : "An error occurred",
    statusCode,
    typeof errMsg !== "string" ? errMsg : null
  );
};

// export
export { customError };
