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
