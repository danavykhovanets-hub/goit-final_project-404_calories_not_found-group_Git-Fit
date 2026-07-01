// Extracts the status and server message from a request error (axios).
export function parseError(error) {
  return {
    status: error?.response?.status,
    message: error?.response?.data?.message,
  };
}
