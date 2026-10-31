# TypeHorizon deployment checklist

This repository is a modified GPL-3.0 application. It is not ready for a production deployment merely because the frontend builds.

## Required project-owned configuration

- [ ] Set `BACKEND_URL` to a TypeHorizon-operated backend or same-origin reverse proxy. The frontend no longer falls back to `https://api.monkeytype.com`.
- [ ] Provision and configure a TypeHorizon Firebase project if authentication is enabled; use its own web and admin credentials.
- [ ] Configure a production `RECAPTCHA_SITE_KEY` and verify the matching server-side secret if reCAPTCHA is enabled.
- [ ] Configure the mail provider, sender identities, DNS, and password-reset/verification templates for the TypeHorizon operator.
- [ ] Configure optional Sentry only after creating a TypeHorizon Sentry project. Set `SENTRY`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT` together.
- [ ] Review all external integrations, analytics, telemetry, CAPTCHA, authentication, storage, and API endpoints. Do not use upstream Monkeytype credentials or services without authorization.
- [ ] Replace the inherited privacy-policy, terms-of-service, and security-policy pages with accurate TypeHorizon documents, including the actual operator identity, hosting, subprocessors, data flows, retention periods, and contact channel.
- [ ] Configure the canonical production domain, TLS, redirects, robots.txt, sitemap, and PWA icon set.
- [ ] Review licensing for all bundled fonts, icons, images, language packs, word lists, and other third-party assets; preserve their notices and applicable license terms.
- [ ] Test user registration, login, password recovery, test submission, result history, settings persistence, admin tasks, and deletion workflows against the TypeHorizon backend.

## Internal package identifiers

The inherited monorepo retains package scopes such as `@monkeytype/*` to avoid a broad dependency and lockfile migration in the initial rebrand. Those names are internal implementation identifiers. A full workspace rename is a separate refactor and must update all imports, package manifests, generated lockfile data, and release scripts consistently.

## Legal-policy warning

The bundled HTML files for privacy, terms, and security are visibly marked as upstream reference documents. They are not policies approved for TypeHorizon and must be replaced before those routes are published.
