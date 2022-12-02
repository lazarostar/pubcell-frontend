export function client(endpoint) {
  return window
    .fetch(`http://localhost:5000/${endpoint}`)
    .then((response) => response.json());
}
