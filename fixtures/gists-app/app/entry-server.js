import ReactDOMServer from "react-dom/server";
import Remix from "@remix-run/react/server";

import App, { ErrorBoundary } from "./App";

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  let markup = ReactDOMServer.renderToString(
    <Remix
      context={remixContext}
      url={request.url}
      ErrorBoundary={ErrorBoundary}
    >
      <App />
    </Remix>
  );

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: {
      ...Object.fromEntries(responseHeaders),
      "Content-Type": "text/html"
    }
  });
}
