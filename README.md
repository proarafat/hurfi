# Baidu push queue

Data only. This branch holds `state.json`, the queue of the daily Baidu link submission
(`.github/workflows/baidu-push.yml` on `main`). Netlify builds only `main`, so nothing here is ever built
or deployed. The token is not stored here (GitHub Actions secret `BAIDU_PUSH_TOKEN`).

- `submitted`: Chinese URLs Baidu accepted, with the content fingerprint at that time (`null` = recorded
  on the next run from https://hurfi.com/zh-pages.json, without sending again).
- `pending`: URLs waiting for Baidu's daily quota, oldest first (new pages, changed pages, leftovers).
- `rejected`: URLs Baidu refused as invalid; sent again only when the page changes.
- `dailyQuota` / `quotaUsedUpOn`: Baidu's daily quota as last reported, and the Beijing date it ran out.
- `runs`: one line per run that changed something.

History: on 2026-11-24 the former Netlify build plugin sent the first Chinese URLs; Baidu accepted 10 and
then answered "over quota". Those 10 are under `submitted`, the other 125 under `pending`.
