# Contributing Rules for DCIT208 Client Projects

## 1. Work must start from an issue

Every meaningful change must begin with a GitHub Issue. The issue should describe:

- the user/client need;
- the requirement or user story being addressed;
- acceptance criteria;
- relevant screenshots, diagrams, or notes;
- the expected test or validation evidence.

## 2. Branch naming

Use clear branch names:

```text
feature/issue-number-short-description
fix/issue-number-short-description
docs/issue-number-short-description
test/issue-number-short-description
```

Examples:

```text
feature/12-client-registration
fix/18-login-validation
docs/22-update-user-manual
test/27-add-booking-edge-cases
```

## 3. Pull request rule

Do not push directly to `main` unless the lecturer explicitly approves it. Use pull requests.

A good pull request must include:

- linked issue;
- explanation of what changed;
- screenshots or demo evidence where relevant;
- tests added or updated;
- AI usage disclosure;
- reviewer feedback before merge.

## 4. Code review rule

The reviewer must not merely write “LGTM.” The reviewer must check:

- whether the change matches the requirement;
- whether the design is understandable;
- whether there are obvious defects;
- whether data privacy/security issues exist;
- whether tests are sufficient;
- whether the contributor can explain the change.

## 5. Definition of Done

A feature is done only when:

- the linked issue is clear;
- the implementation is complete;
- tests or validation evidence exist;
- documentation is updated;
- the PR has been reviewed;
- CI passes;
- AI use, if any, has been logged;
- the team can demonstrate the feature to the client or lecturer.

## 6. AI-assisted work

AI may help you reason, draft, refactor, or debug. AI must not replace your engineering judgment.

Whenever AI is used, update `AI_USAGE_LOG.md` with:

- date;
- tool used;
- prompt summary;
- output used;
- verification performed;
- name of student responsible.

If you cannot explain a contribution, do not submit it.
