export function client(endpoint, _ = false) {
  return window
    .fetch(`http://localhost${_ ? "" : ":5000"}/${endpoint}`)
    .then((response) => response.json());
}
