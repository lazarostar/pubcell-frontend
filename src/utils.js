export function client(endpoint, { data, _ = false } = {}) {
  return window
    .fetch(`http://localhost${_ ? "" : ":5000"}/${endpoint}`, {
      method: data ? "POST" : "GET",
      headers: {
        "Content-Type": data ? "application/json" : undefined,
      },
      body: data ? JSON.stringify(data) : undefined,
    })
    .then((response) => response.json());
}
