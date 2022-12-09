export function client(endpoint, { data, _ = false } = {}) {
  console.log(data)
  return window
    .fetch(`http://134.122.68.114${_ ? "" : ":8080"}/${endpoint}`, {
      method: data ? "POST" : "GET",
      headers: {
        "Content-Type": data ? "application/json" : undefined,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
    .then((response) => response.json());
}
