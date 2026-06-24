# avro-docgen

`avro-docgen` generates deterministic Markdown documentation from Apache Avro `.avsc` schema files.

The package is published as `@dobeerman/avro-docgen`. The installed CLI command is still `avro-docgen`.

## Requirements

- Node.js 24
- Corepack enabled
- pnpm managed by the `packageManager` field

## Usage

Run once without installing:

```sh
pnpm dlx @dobeerman/avro-docgen generate
```

Run in a project where the package is installed:

```sh
pnpm exec avro-docgen generate
```

Generate from the default `schemas` directory into `docs/avro/README.md`:

```sh
pnpm exec avro-docgen generate
```

Generate with an explicit schema root and output directory:

```sh
pnpm exec avro-docgen generate --schema-root schemas --output docs/avro
```

Generate from multiple schema roots:

```sh
pnpm exec avro-docgen generate --schema-root schemas shared/avro --output docs/avro
```

Use a config file:

```sh
pnpm exec avro-docgen generate --config .avrodocrc.json
```

Use a different working directory for config discovery and relative paths:

```sh
pnpm exec avro-docgen generate --cwd path/to/project
```

## `generate` Options

- `-c, --config <path>`: Path to an `avrodoc` config file.
- `--cwd <path>`: Working directory for config discovery and relative paths. Defaults to the current directory.
- `-o, --output <dir>`: Directory where generated documentation is written. Overrides `outputDir` from config.
- `--schema-root <dir...>`: One or more schema root directories to scan. Overrides `schemaRoots` from config.

Only `generate` is implemented today. Placeholder code exists for future `init`, `validate`, `check`, and `graph` commands, but those commands are not registered in the CLI yet.

## Configuration

Configuration is loaded with `cosmiconfig` using the `avrodoc` module name.

Supported config locations:

- `.avrodocrc`
- `.avrodocrc.json`
- `.avrodocrc.yaml`
- `.avrodocrc.yml`
- `avrodoc.config.json`
- `avrodoc.config.yaml`
- `avrodoc.config.yml`
- `avrodoc` field in `package.json`

Default config:

```json
{
  "schemaRoots": ["schemas"],
  "schemaPatterns": ["**/*.avsc"],
  "outputDir": "docs/avro",
  "readmeFile": "README.md"
}
```

Example `.avrodocrc.json`:

```json
{
  "schemaRoots": ["schemas", "shared/avro"],
  "schemaPatterns": ["**/*.avsc"],
  "outputDir": "docs/avro",
  "readmeFile": "README.md"
}
```

## Generated Output

The current `generate` command writes one Markdown README at `<outputDir>/<readmeFile>`.

It documents:

- Avro records, enums, and fixed types.
- Nested named types, including records inside array items and map values.
- Field names, formatted Avro types, default values, and descriptions.
- Enum symbols.
- Logical types.

Examples of rendered field types:

- `string`
- `string (uuid)`
- `long (timestamp-millis)`
- `int (nullable)`
- `Section (nullable)`
- `array<SkeletalDataFrame>`
- `map<Position>`

Explicit defaults are rendered in the `Default` column. For example, a nullable field with `"default": null` is rendered with type `T (nullable)` and default `` `null` ``.

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

Publishing is automated from `main` through semantic-release. The release workflow runs `pnpm run ci`, calculates the next version from conventional commits, publishes the package to the npm registry, generates release notes, and creates a GitHub release.

## Current Scope

`avro-docgen` currently focuses on generating Markdown documentation from local Avro `.avsc` files.

Out of scope for the current version:

- HTML output.
- Schema Registry integration.
- Template engines.
- Plugin systems.
- Servers, databases, queues, or web UIs.
