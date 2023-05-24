export function getParameterByName(name, url, skipLowercaseValues) {
  if (!url) url = window.location.href;
  if (!skipLowercaseValues) {
    url = url.toLowerCase(); // This is just to avoid case sensitiveness
  }
  name = name.replace(/[\[\]]/g, "\\$&"); // This is just to avoid case sensitiveness for query parameter name
  if (!skipLowercaseValues) {
    name = name.toLowerCase();
  }
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, "+"));
}
