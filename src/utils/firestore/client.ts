const callApi = async (
  method: "POST" | "PUT" | "GET" | "DELETE",
  collection: "sets" | "cards",
  id: string,
  data: string
) =>
  await fetch(`/v1/${collection}/${id}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

export { callApi };
