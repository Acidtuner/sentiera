# Cortex Testing Checklist

Run these checks after every deploy to `cortex.sentieratech.com`.

## Auth & Landing
- [ ] Unauthenticated visit to `/` shows headline, pillars, and “Get your free audit” button
- [ ] Clicking the button opens the auth modal
- [ ] `/login` redirects to `/?auth=login` and opens the modal in login mode
- [ ] `/register` redirects to `/?auth=register` and opens the modal in register mode
- [ ] Google OAuth completes and returns to the audit form (not login)
- [ ] Email/password sign-in works and closes the modal
- [ ] Email/password register works (or shows confirmation message)

## Free tier limit
- [ ] First domain audit succeeds and is recorded
- [ ] Re-auditing the same domain succeeds
- [ ] Auditing a different domain is blocked with the free-tier message

## Audit flow
- [ ] Form validation (name, company, email, URL, keyword) works
- [ ] Progress indicator appears during the audit
- [ ] Report shows score, pillars, advanced signals, and pages analyzed
- [ ] Email report is received on success
- [ ] Failed audits are stored in Supabase

## Middleware
- [ ] Direct visit to a protected route while logged out redirects to login
- [ ] `/auth/callback` is reachable and does not 404

## Edge cases
- [ ] Refresh after login keeps the user authenticated
- [ ] Logout (if added) clears the session and shows the landing again
- [ ] Invalid URL or unreachable site shows a clear error
