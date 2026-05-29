export function trackPageView(path: string, title: string) {
  window.dispatchEvent(new CustomEvent("hr-remedy:page-view", { detail: { path, title } }));
}
