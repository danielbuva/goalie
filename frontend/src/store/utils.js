export async function meloFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";
  }

  return await window.fetch(url, options);
}

export function sortGoals(goals) {
  return [...goals].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}
