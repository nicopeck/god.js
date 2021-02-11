import { useRouteData, Form, useSubmit } from "@remix-run/react";
import type { MetaFunction, Loader, Action } from "@remix-run/data";
import { redirect } from "@remix-run/data";
import { Link } from "react-router-dom";

import { userPrefsCookie } from "../cookies";

function getUserPrefs(cookieHeader: string | null): any {
  return (
    userPrefsCookie.parse(cookieHeader) || { language: null, showBanner: true }
  );
}

function setUserPrefs(userPrefs: any): string {
  return userPrefsCookie.serialize(userPrefs);
}

export let meta: MetaFunction = () => {
  return { title: "User Preferences" };
};

export let loader: Loader = async ({ request }) => {
  return getUserPrefs(request.headers.get("Cookie"));
};

export let action: Action = async ({ request }) => {
  let userPrefs = getUserPrefs(request.headers.get("Cookie"));
  let formParams = new URLSearchParams(await request.text());

  if (formParams.has("language")) {
    userPrefs.language = formParams.get("language");
  }

  userPrefs.showBanner = formParams.get("showBanner") === "on";

  return redirect("/prefs", {
    headers: {
      "Set-Cookie": setUserPrefs(userPrefs)
    }
  });
};

export let handle = {
  breadcrumb: () => <Link to="/prefs">Preferences</Link>
};

export default function UserPrefs() {
  let userPrefs = useRouteData();
  let submit = useSubmit();

  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    // Do a full document load:
    // event.currentTarget.submit();

    // Do a client-side transition:
    submit(event.currentTarget, { replace: true });
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    // Do a full document load:
    // Note: Does not include the button's name+value :( Better to just
    // use <Form forceRefresh> and no <button onClick>
    // event.currentTarget.form.submit();

    // Do a client-side transition:
    // Bonus: Automatically adds the button's name+value :D
    submit(event.currentTarget, { replace: true });
  }

  return (
    <div>
      <header>
        <h1>User Preferences</h1>
      </header>
      <div>
        <Form method="post" replace onChange={handleChange}>
          <p>
            <label>
              Language:{" "}
              <select
                name="language"
                defaultValue={
                  userPrefs.language ||
                  (typeof navigator !== "undefined" && navigator.language)
                }
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (GB)</option>
                <option value="it-IT">Italian</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="zh-CN">Chinese</option>
              </select>
            </label>
          </p>
          <p>
            <label>
              Show banner:{" "}
              <input
                type="checkbox"
                name="showBanner"
                defaultChecked={userPrefs.showBanner}
              />
            </label>
          </p>
          <p>
            <label>
              Banner:{" "}
              <button
                type="button"
                onClick={handleClick}
                name="showBanner"
                value="on"
              >
                Show
              </button>{" "}
              <button
                type="button"
                onClick={handleClick}
                name="showBanner"
                value="off"
              >
                Hide
              </button>
            </label>
          </p>
        </Form>
      </div>
      <div>
        <pre>{JSON.stringify(userPrefs, null, 2)}</pre>
      </div>
    </div>
  );
}
