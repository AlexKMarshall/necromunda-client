export function createURLQuery(entries: { [key: string]: string | undefined }) {
  const urlQuery = new URLSearchParams();
  Object.entries(entries).forEach(([key, value]) => {
    if (value !== undefined) {
      urlQuery.append(encodeURIComponent(key), encodeURIComponent(value));
    }
  });
  return urlQuery;
}
