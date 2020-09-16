# Welcome to Remix development!

Remix is a framework for shipping better websites.

## Development

```
# install everything
yarn install

# run the build
yarn build

# run the tests
yarn test
# run the tests for a specific package
yarn test react
# run the tests in watch mode
yarn test react --watch

# cut a release
yarn run version major|minor|patch|prerelease [prereleaseId]
yarn run publish
# or, to automatically publish from GitHub Actions
git push origin --follow-tags
```

## Roadmap

- Server
  x HMR
  x Status codes from loaders (rewrites, redirects)
  - Meta tags
  - In dev, error overlays in the browser
  - `/__remix_patch` manifest endpoint
- Client
  - web manifest
  - hydrate React, no data
  - hydrate with data (putting `__DATA__` on window)
  - clicking links, transitions
    - `cache.preload` triggers suspense, fetches new data from `/__remix_data`
    - `cache.write` (includes copy results) to populate data cache for new location
    - proper status codes in the browser (reload on 404, etc.)
    - update `document.title`
    - patch client manifest when links render (or on `navigate`)
  - open questions about data cache:
    - how do you share models across locations?
    - how do you expire some data?
  - scroll management
  - focus management
- CLI
  - `remix run`
    - Watch project root, rebuild as files change
  - `remix build`
- Browser dev tools
