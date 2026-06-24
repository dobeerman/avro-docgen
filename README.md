# avro-docgen

`avro-docgen` generates deterministic Markdown documentation from Apache Avro `.avsc` schema files.

The package is published to the npm registry, while repository development uses pnpm only.

## Requirements

- Node.js 24
- Corepack enabled
- pnpm managed by the `packageManager` field

## Development

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm run ci
pnpm typecheck
pnpm check
pnpm test
pnpm build
```

## Commits and Releases

This repository uses conventional commits, commitlint, Husky, and semantic-release.

Local commits are checked with the repository-local commitlint installation. CI also validates commit messages for pull requests and pushes.

Examples:

```text
feat: add schema reference resolution
fix: render nullable defaults deterministically
chore(release): update release automation
```

Release-triggering commits:

- `fix:` creates a patch release.
- `feat:` creates a minor release.
- commits with `BREAKING CHANGE:` in the footer create a major release.

Publishing is automated from `main` through semantic-release. The release workflow runs `pnpm run ci`, calculates the next version from conventional commits, updates `CHANGELOG.md`, publishes the package to the npm registry, and creates a GitHub release. npm trusted publishing/OIDC should be configured for the repository before the first real release.

Run the CLI during development:

```sh
pnpm dev generate --schema-root test/fixtures/simple-inline/schemas --output tmp/docs
```

Run a one-off CLI through pnpm:

```sh
pnpm dlx avro-docgen generate
```

## Configuration

Configuration is loaded with `cosmiconfig` using the `avrodoc` module name. Supported locations include `.avrodocrc`, `.avrodocrc.json`, `.avrodocrc.yaml`, `.avrodocrc.yml`, `avrodoc.config.json`, `avrodoc.config.yaml`, `avrodoc.config.yml`, and the `avrodoc` field in `package.json`.

```json
{
  "schemaRoots": ["schemas"],
  "schemaPatterns": ["**/*.avsc"],
  "outputDir": "docs/avro",
  "readmeFile": "README.md"
}
```

## Current Scope

The first vertical slice supports config loading, schema scanning, basic named-type parsing, and a minimal `generate` command that writes a Markdown README for simple schemas. HTML output, Schema Registry integration, template engines, plugin systems, servers, databases, queues, and web UIs are outside v1 scope.
