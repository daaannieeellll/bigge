const callApi = async (
  method: "POST" | "PUT" | "GET" | "DELETE",
  collection: "sets" | "cards",
  id: string,
  data?: string,
  query?: { [key: string]: string }
) => {
  const params = query
    ? Object.keys(query || {})
        .map((key) => `${key}=${query[key]}`)
        .join("&")
    : "";
  return fetch(`/v1/${collection}/${id}?${params}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
};

export { callApi };
