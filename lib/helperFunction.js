export const setHttpCookie = async (props) => {
  return fetch("/api/set_http_cookie", {
    credentials: "include",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};
