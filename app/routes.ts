export const basePath = import.meta.env.BASE_URL;
export const homeHref = (view = "library") =>
  view === "library" ? basePath : `${basePath}${view}/`;
export const courseHref = (id: string) => `${basePath}learn/${id}/`;
export const currentRoute = () =>
  location.pathname.slice(basePath.length).replace(/^\/+|\/+$/g, "") ||
  "library";
export function navigate(path: string, replace = false) {
  if (replace) history.replaceState(null, "", path);
  else history.pushState(null, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
