# New Website Git Deploy Setup (Hostinger)

Use this checklist to spin up a brand-new site that deploys automatically when you push to the server-side git repo. The flow reuses your existing Hostinger SSH key (`~/.ssh/id_ed25519`) and `hostinger-therapair` SSH config entry.

---

## 1. Confirm SSH Access (one time per machine)

```bash
ssh hostinger-therapair "echo 'SSH OK'"
```

If this succeeds without a password prompt, you are already using the saved key. Hostinger keys are **per account**, not per domain, so you can reuse the same key for every site that deploys under user `u549396201`.

If you see a password prompt, follow `export/SSH-KEY-SETUP-FIX.md` to repair the key before continuing.

---

## 2. Create the Project Locally

Inside your new project directory (e.g., `/Users/tino/Projects/NewSite`):

```bash
# Example scaffold (replace with your framework/tooling)
npm create vite@latest
cd newsite
npm install
git init
git branch -M main
```

Add a `.gitignore`, `.env.example`, and any build tooling you need. Commit the baseline:

```bash
git add .
git commit -m "Initial commit"
```

---

## 3. Prepare Remote Paths (per site)

Decide on two paths:

- Bare repo: `~/repos/<site>.git`
- Web root: `/home/u549396201/domains/<domain>/public_html`

Choose a short `<site>` name (e.g., `therapair-marketing`). The `<domain>` matches the domain/subdomain you configured in Hostinger’s hPanel.

Create the bare repo and deploy hook in one command (replace placeholders):

```bash
ssh hostinger-therapair 'mkdir -p ~/repos/therapair-marketing.git && \
  cd ~/repos/therapair-marketing.git && \
  git init --bare && \
  cat > hooks/post-receive << "HOOK"
#!/bin/bash
set -e

WEBROOT="/home/u549396201/domains/example.com/public_html"
TMP_DIR="/tmp/deploy-$(date +%s)"

mkdir -p "$TMP_DIR"
git --work-tree="$TMP_DIR" --git-dir="$(pwd)" checkout -f
rsync -az --delete "$TMP_DIR"/ "$WEBROOT"/

find "$WEBROOT" -type f -exec chmod 644 {} \;
find "$WEBROOT" -type d -exec chmod 755 {} \;

rm -rf "$TMP_DIR"
echo "✔ Deployed to $WEBROOT"
HOOK
chmod +x hooks/post-receive'
```

Verify:

```bash
ssh hostinger-therapair 'test -x ~/repos/therapair-marketing.git/hooks/post-receive && echo ok'
```

---

## 4. Point Local Git to the Remote

From inside your project:

```bash
git remote add origin ssh://hostinger-therapair/home/u549396201/repos/therapair-marketing.git
git push -u origin main
```

Your existing SSH config supplies the host, port, user, and key, so no extra setup is required for the new domain.

---

## 5. Automate the Deploy Push

Drop this helper script into the project root as `deploy-to-host.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Git Push Deployment"

git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || true

if git remote get-url origin >/dev/null 2>&1; then
  git push origin main
  echo "✅ Deployed via git push"
else
  echo "⚠️  No origin remote configured."
  exit 1
fi
```

Make it executable:

```bash
chmod +x deploy-to-host.sh
```

Optional `package.json` shortcut:

```json
{
  "scripts": {
    "deploy": "./deploy-to-host.sh"
  }
}
```

---

## 6. Local→Git→Deploy Loop

1. `npm run dev` (or equivalent) to work locally.
2. Commit meaningful changes with normal git commits.
3. When ready to deploy: `./deploy-to-host.sh` (or `npm run deploy`).
4. Post-receive hook checks out the latest commit and syncs it to the domain’s web root automatically.

---

## 7. Extra Domains or Subdomains

- Reuse the **same SSH key and `hostinger-therapair` alias**.
- Repeat Steps 3–5 with new repo/webroot paths.
- Each domain gets its own bare repo + hook so deployments stay isolated.

---

## 8. Troubleshooting

- `ssh hostinger-therapair` → should connect with no password.
- `ssh hostinger-therapair 'ls ~/repos'` → confirm the repo exists.
- `ssh hostinger-therapair 'ls /home/u549396201/domains/example.com/public_html'` → confirm webroot path.
- For build systems (Next.js, Vite, etc.), either commit the build artifacts or add the build step inside `post-receive` before `rsync` (requires toolchain installed on the server).

---

Once this is in place, the local → git → deploy loop is as simple as edit → commit → `git push` (or the helper script), with the same Hostinger SSH identity handling every domain.
















