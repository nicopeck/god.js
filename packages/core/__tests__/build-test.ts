import path from "path";
import type { OutputAsset } from "rollup";

import type { BuildOptions } from "../compiler";
import { BuildMode, BuildTarget, build, generate } from "../compiler";
import type { RemixConfig } from "../config";
import { readConfig } from "../config";

async function generateBuild(config: RemixConfig, options: BuildOptions) {
  return await generate(await build(config, options));
}

const remixRoot = path.resolve(__dirname, "../../../fixtures/gists-app");

describe("building", () => {
  let config: RemixConfig;
  beforeAll(async () => {
    config = await readConfig(remixRoot);
  });

  beforeEach(() => {
    jest.setTimeout(10000);
  });

  describe("the development server build", () => {
    it("generates the correct bundles and manifest", async () => {
      let { output } = await generateBuild(config, {
        mode: BuildMode.Development,
        target: BuildTarget.Server
      });

      expect(output.map(item => item.fileName)).toMatchInlineSnapshot(`
        Array [
          "entry-server.js",
          "routes/404.js",
          "routes/500.js",
          "routes/gists.js",
          "routes/gists/$username.js",
          "routes/gists/index.js",
          "routes/gists.mine.js",
          "routes/index.js",
          "pages/one.js",
          "pages/two.js",
          "_shared/Shared-4f69c99e.js",
          "server-manifest.json",
        ]
      `);

      let manifest = output.find(
        item => item.fileName === "server-manifest.json"
      ) as OutputAsset;

      expect(JSON.parse(manifest.source as string)).toMatchInlineSnapshot(`
        Object {
          "entry-server": Object {
            "fileName": "entry-server.js",
            "imports": Array [
              "react",
              "react-dom/server",
              "@remix-run/core",
              "@remix-run/react/server",
              "@remix-run/react",
            ],
          },
          "pages/one": Object {
            "fileName": "pages/one.js",
            "imports": Array [
              "react",
              "@mdx-js/react",
            ],
          },
          "pages/two": Object {
            "fileName": "pages/two.js",
            "imports": Array [
              "@mdx-js/react",
            ],
          },
          "routes/404": Object {
            "fileName": "routes/404.js",
            "imports": Array [
              "react",
            ],
          },
          "routes/500": Object {
            "fileName": "routes/500.js",
            "imports": Array [
              "react",
            ],
          },
          "routes/gists": Object {
            "fileName": "routes/gists.js",
            "imports": Array [
              "react",
              "@remix-run/react",
              "react-router-dom",
              "_shared/Shared-4f69c99e.js",
            ],
          },
          "routes/gists.mine": Object {
            "fileName": "routes/gists.mine.js",
            "imports": Array [
              "react",
            ],
          },
          "routes/gists/$username": Object {
            "fileName": "routes/gists/$username.js",
            "imports": Array [
              "react",
              "@remix-run/react",
              "react-router-dom",
            ],
          },
          "routes/gists/index": Object {
            "fileName": "routes/gists/index.js",
            "imports": Array [
              "react",
              "@remix-run/react",
            ],
          },
          "routes/index": Object {
            "fileName": "routes/index.js",
            "imports": Array [
              "react",
              "@remix-run/react",
              "_shared/Shared-4f69c99e.js",
            ],
          },
        }
      `);
    });
  });

  describe("the production server build", () => {
    it("generates the correct bundles and manifest", async () => {
      let { output } = await generateBuild(config, {
        mode: BuildMode.Production,
        target: BuildTarget.Server
      });

      expect(output.map(item => item.fileName)).toMatchInlineSnapshot(`
        Array [
          "entry-server-ec81fe4f.js",
          "routes/404-660aace6.js",
          "routes/500-3568401c.js",
          "routes/gists-1f3a6394.js",
          "routes/gists/$username-6467bc2d.js",
          "routes/gists/index-eda98f93.js",
          "routes/gists.mine-9c786e2b.js",
          "routes/index-933c0125.js",
          "pages/one-57b1bc15.js",
          "pages/two-c45d0835.js",
          "_shared/Shared-4f69c99e.js",
          "_shared/_rollupPluginBabelHelpers-8a275fd9.js",
          "server-manifest.json",
        ]
      `);

      let manifest = output.find(
        item => item.fileName === "server-manifest.json"
      ) as OutputAsset;

      expect(JSON.parse(manifest.source as string)).toMatchInlineSnapshot(`
        Object {
          "entry-server": Object {
            "fileName": "entry-server-ec81fe4f.js",
            "imports": Array [
              "react",
              "react-dom/server",
              "@remix-run/core",
              "@remix-run/react/server",
              "@remix-run/react",
            ],
          },
          "pages/one": Object {
            "fileName": "pages/one-57b1bc15.js",
            "imports": Array [
              "react",
              "_shared/_rollupPluginBabelHelpers-8a275fd9.js",
              "@mdx-js/react",
            ],
          },
          "pages/two": Object {
            "fileName": "pages/two-c45d0835.js",
            "imports": Array [
              "_shared/_rollupPluginBabelHelpers-8a275fd9.js",
              "@mdx-js/react",
            ],
          },
          "routes/404": Object {
            "fileName": "routes/404-660aace6.js",
            "imports": Array [
              "react",
            ],
          },
          "routes/500": Object {
            "fileName": "routes/500-3568401c.js",
            "imports": Array [
              "react",
            ],
          },
          "routes/gists": Object {
            "fileName": "routes/gists-1f3a6394.js",
            "imports": Array [
              "react",
              "@remix-run/react",
              "react-router-dom",
              "_shared/Shared-4f69c99e.js",
            ],
          },
          "routes/gists.mine": Object {
            "fileName": "routes/gists.mine-9c786e2b.js",
            "imports": Array [
              "react",
            ],
          },
          "routes/gists/$username": Object {
            "fileName": "routes/gists/$username-6467bc2d.js",
            "imports": Array [
              "react",
              "@remix-run/react",
              "react-router-dom",
            ],
          },
          "routes/gists/index": Object {
            "fileName": "routes/gists/index-eda98f93.js",
            "imports": Array [
              "react",
              "@remix-run/react",
            ],
          },
          "routes/index": Object {
            "fileName": "routes/index-933c0125.js",
            "imports": Array [
              "react",
              "@remix-run/react",
              "_shared/Shared-4f69c99e.js",
            ],
          },
        }
      `);
    });
  });

  describe("the development browser build", () => {
    it("generates the correct bundles and manifest", async () => {
      let { output } = await generateBuild(config, {
        mode: BuildMode.Development,
        target: BuildTarget.Browser
      });

      expect(output.map(item => item.fileName)).toMatchInlineSnapshot(`
        Array [
          "entry-browser.js",
          "routes/404.js",
          "routes/500.js",
          "routes/gists.js",
          "routes/gists/$username.js",
          "routes/gists/index.js",
          "routes/gists.mine.js",
          "routes/index.js",
          "pages/one.js",
          "pages/two.js",
          "_shared/index-6a53de4a.js",
          "_shared/index-3961b2a7.js",
          "_shared/Shared-ee27405e.js",
          "_shared/esm-733856b1.js",
          "global.css",
          "routes/gists.css",
          "asset-manifest.json",
        ]
      `);

      let manifest = output.find(
        item => item.fileName === "asset-manifest.json"
      ) as OutputAsset;

      expect(JSON.parse(manifest.source as string)).toMatchInlineSnapshot(`
        Object {
          "entry-browser": Object {
            "fileName": "entry-browser.js",
            "imports": Array [
              "_shared/index-6a53de4a.js",
              "_shared/index-3961b2a7.js",
            ],
          },
          "global.css": Object {
            "fileName": "global.css",
          },
          "pages/one": Object {
            "fileName": "pages/one.js",
            "imports": Array [
              "_shared/index-6a53de4a.js",
              "_shared/esm-733856b1.js",
            ],
          },
          "pages/two": Object {
            "fileName": "pages/two.js",
            "imports": Array [
              "_shared/index-6a53de4a.js",
              "_shared/esm-733856b1.js",
            ],
          },
          "routes/404": Object {
            "fileName": "routes/404.js",
            "imports": Array [
              "_shared/index-6a53de4a.js",
            ],
          },
          "routes/500": Object {
            "fileName": "routes/500.js",
            "imports": Array [
              "_shared/index-6a53de4a.js",
            ],
          },
          "routes/gists": Object {
            "fileName": "routes/gists.js",
            "imports": Array [
              "_shared/index-6a53de4a.js",
              "_shared/index-3961b2a7.js",
              "_shared/Shared-ee27405e.js",
            ],
          },
          "routes/gists.css": Object {
            "fileName": "routes/gists.css",
          },
          "routes/gists.mine": Object {
            "fileName": "routes/gists.mine.js",
            "imports": Array [
              "_shared/index-6a53de4a.js",
            ],
          },
          "routes/gists/$username": Object {
            "fileName": "routes/gists/$username.js",
            "imports": Array [
              "_shared/index-6a53de4a.js",
              "_shared/index-3961b2a7.js",
            ],
          },
          "routes/gists/index": Object {
            "fileName": "routes/gists/index.js",
            "imports": Array [
              "_shared/index-6a53de4a.js",
              "_shared/index-3961b2a7.js",
            ],
          },
          "routes/index": Object {
            "fileName": "routes/index.js",
            "imports": Array [
              "_shared/index-6a53de4a.js",
              "_shared/index-3961b2a7.js",
              "_shared/Shared-ee27405e.js",
            ],
          },
        }
      `);
    });
  });

  describe("the production browser build", () => {
    it("generates the correct bundles and manifest", async () => {
      let { output } = await generateBuild(config, {
        mode: BuildMode.Production,
        target: BuildTarget.Browser
      });

      expect(output.map(item => item.fileName)).toMatchInlineSnapshot(`
        Array [
          "entry-browser-12d6e5db.js",
          "routes/404-1d515a6b.js",
          "routes/500-7a377214.js",
          "routes/gists-5384cdf1.js",
          "routes/gists/$username-7f3e623e.js",
          "routes/gists/index-8144b77f.js",
          "routes/gists.mine-9663993e.js",
          "routes/index-ee9b502b.js",
          "pages/one-473f069d.js",
          "pages/two-6a6433e1.js",
          "_shared/index-c6ac21e6.js",
          "_shared/index-24845393.js",
          "_shared/Shared-e118765d.js",
          "_shared/esm-7b00c7dc.js",
          "global-ec887178.css",
          "routes/gists-a6d2a823.css",
          "asset-manifest.json",
        ]
      `);

      let manifest = output.find(
        item => item.fileName === "asset-manifest.json"
      ) as OutputAsset;

      expect(JSON.parse(manifest.source as string)).toMatchInlineSnapshot(`
        Object {
          "entry-browser": Object {
            "fileName": "entry-browser-12d6e5db.js",
            "imports": Array [
              "_shared/index-c6ac21e6.js",
              "_shared/index-24845393.js",
            ],
          },
          "global.css": Object {
            "fileName": "global-ec887178.css",
          },
          "pages/one": Object {
            "fileName": "pages/one-473f069d.js",
            "imports": Array [
              "_shared/index-c6ac21e6.js",
              "_shared/esm-7b00c7dc.js",
            ],
          },
          "pages/two": Object {
            "fileName": "pages/two-6a6433e1.js",
            "imports": Array [
              "_shared/index-c6ac21e6.js",
              "_shared/esm-7b00c7dc.js",
            ],
          },
          "routes/404": Object {
            "fileName": "routes/404-1d515a6b.js",
            "imports": Array [
              "_shared/index-c6ac21e6.js",
            ],
          },
          "routes/500": Object {
            "fileName": "routes/500-7a377214.js",
            "imports": Array [
              "_shared/index-c6ac21e6.js",
            ],
          },
          "routes/gists": Object {
            "fileName": "routes/gists-5384cdf1.js",
            "imports": Array [
              "_shared/index-c6ac21e6.js",
              "_shared/index-24845393.js",
              "_shared/Shared-e118765d.js",
            ],
          },
          "routes/gists.css": Object {
            "fileName": "routes/gists-a6d2a823.css",
          },
          "routes/gists.mine": Object {
            "fileName": "routes/gists.mine-9663993e.js",
            "imports": Array [
              "_shared/index-c6ac21e6.js",
            ],
          },
          "routes/gists/$username": Object {
            "fileName": "routes/gists/$username-7f3e623e.js",
            "imports": Array [
              "_shared/index-c6ac21e6.js",
              "_shared/index-24845393.js",
            ],
          },
          "routes/gists/index": Object {
            "fileName": "routes/gists/index-8144b77f.js",
            "imports": Array [
              "_shared/index-c6ac21e6.js",
              "_shared/index-24845393.js",
            ],
          },
          "routes/index": Object {
            "fileName": "routes/index-ee9b502b.js",
            "imports": Array [
              "_shared/index-c6ac21e6.js",
              "_shared/index-24845393.js",
              "_shared/Shared-e118765d.js",
            ],
          },
        }
      `);
    });
  });
});
