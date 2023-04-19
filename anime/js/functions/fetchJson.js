async function fetchJson(urlApi, options) {
  const response = await fetch(urlApi, options);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export { fetchJson }
