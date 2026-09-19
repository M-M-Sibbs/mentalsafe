# Security Policy

Mental SafeZw is a mental health application. A defect here can affect people
at their most vulnerable, so security reports are taken seriously and
prioritised over feature work.

## Reporting a vulnerability

Please **do not open a public issue** for a security vulnerability.

Use GitHub's private reporting instead: **Security → Advisories → Report a
vulnerability** on this repository. That keeps the details private until a fix
is available.

Please include what you found, how to reproduce it, and what an attacker could
achieve. You will get an acknowledgement as quickly as possible.

## Reporting incorrect clinical or crisis information

**This is as important as a code vulnerability, and often more urgent.**

Open an issue immediately, or report privately if you prefer, if you find:

- A crisis helpline number that does not connect, or has been reassigned
- A scoring threshold that does not match the published instrument
- An instrument item whose wording has drifted from the validated original
- Result guidance that could mislead someone about how urgently they need help

A dead crisis number is worse than no number at all. These reports are treated
as high severity regardless of how small the change looks.

## Dependency security

- CI fails the build on any dependency advisory rated `high` or above.
- Dependabot is enabled for weekly npm updates.
- This project shipped briefly on a Next.js version affected by
  [CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478), a CVSS 10.0 remote
  code execution flaw. It is now on a patched release, and the audit gate in CI
  exists specifically so that cannot recur silently.

## Data handling

There is deliberately very little to attack:

- No accounts, no authentication, no user database
- Assessment answers are never transmitted; scores are written to
  `localStorage` on the device and nowhere else
- Individual item responses are discarded once a score is computed
- No analytics or tracking scripts

If you find anything that causes assessment data to leave the device, treat it
as critical and report it privately.
