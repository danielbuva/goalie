export async function meloFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";
  }

  const res = await window.fetch(url, options);

  if (res.status >= 400) throw res;

  return res;
}

export function sortGoals(goals) {
  return [...goals].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}
