# TypeHorizon

TypeHorizon is an independently maintained typing-practice project based on the **Monkeytype** codebase. This repository is a modified version of the upstream project, rebranded for TypeHorizon and prepared for its own deployment.

> **Important:** TypeHorizon is not the original Monkeytype service. It is an independent fork. Original Monkeytype authors and contributors retain attribution for their work; see [UPSTREAM.md](./UPSTREAM.md).

## License and source availability

This entire modified work is distributed under **GNU GPL version 3.0 (GPL-3.0)**. The complete license text is in [LICENSE](./LICENSE), and a copy intended to be served with the frontend is in [frontend/static/LICENSE](./frontend/static/LICENSE).

The corresponding source code, build configuration, and installation scripts are kept in this repository. You may run, study, modify, and redistribute this work under the GPL-3.0 terms. The software is provided without warranty. Do not remove upstream copyright, license, or warranty notices.

See [UPSTREAM.md](./UPSTREAM.md) for the upstream source commit, modification date, and attribution notes.

## What is included

- A customizable typing test interface and result views.
- Multiple languages, test modes, themes, settings, and accessibility-related features inherited from the upstream codebase.
- Frontend and backend applications, shared workspace packages, and development/test tooling.
- A configurable deployment model. Production services must be configured and operated independently for TypeHorizon.

The repository retains internal workspace package names such as `@monkeytype/*` for source compatibility. These are implementation identifiers, not the product name or an indication that this deployment is operated by the upstream project.

## Development requirements

The toolchain declared by the project currently requires:

- Node.js 24.x
- pnpm 11.21.0

Install dependencies and start the workspace:

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm full-check
pnpm ts-check
pnpm build
```

Frontend and backend scripts are also available in the root `package.json`.

## Production configuration — required before deployment

This branch deliberately does **not** default to the original Monkeytype production API. Configure `BACKEND_URL` to your own TypeHorizon backend or same-origin reverse proxy. The frontend also requires its own Firebase configuration and a production `RECAPTCHA_SITE_KEY` when those services are enabled.

Do not deploy with inherited third-party service credentials, endpoints, email addresses, analytics, or Sentry settings. See [TYPEHORIZON_DEPLOYMENT.md](./TYPEHORIZON_DEPLOYMENT.md).

The inherited privacy, terms-of-service, and security-policy HTML pages are upstream reference documents, not approved TypeHorizon policies. Replace them with policies that accurately describe the services, data processing, hosting, and contact details used by the actual TypeHorizon deployment before making those routes public.

## Contributions and issue reports

Use the [GitHub issue tracker](https://github.com/hadi-hani/monkeytype/issues) for TypeHorizon bugs and feature requests. Contributions should retain the GPL-3.0 notices and clearly identify material modifications.

## Upstream project

- Original project: [monkeytypegame/monkeytype](https://github.com/monkeytypegame/monkeytype)
- Original project website: [monkeytype.com](https://monkeytype.com/)
- Upstream source baseline used for this rebrand: commit `5478cd701df9e6a7d4611004ec84bef8999b3aaa` (28 October 2026).

TypeHorizon is an independent modified distribution and is not affiliated with or endorsed by the Monkeytype maintainers.
