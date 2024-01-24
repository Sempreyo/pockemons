export default function getUrlParams(page, perPage, type) {
  let url = new URL(window.location.href);

  if (page && url.searchParams.get("page")) {
    return url.searchParams.get("page");
  }

  if (perPage && url.searchParams.get("per_page")) {
    return url.searchParams.get("per_page");
  }

  if (type && url.searchParams.get("type")) {
    return url.searchParams.get("type");
  }
}
