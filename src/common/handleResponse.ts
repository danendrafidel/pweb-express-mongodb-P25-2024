export default function handleResponse(
  status: "failed" | "error" | "success",
  message: string,
  data: any = null
) {
  return {
    status,
    message,
    data,
  };
}
