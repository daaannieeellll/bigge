const update = async (collection: string, id: string, data: string) =>
  await fetch(`/v1/${collection}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

export { update };
