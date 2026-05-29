# Ra Unlimited — Deployment guide

The site is a Vue 3 SPA (served by nginx) backed by a tiny Node API with SQLite. Two containers, one volume, one shared network.

## 1. Local quickstart

```bash
# in /server
cp .env.example .env  # then edit ADMIN_PASSWORD and JWT_SECRET
npm install
npm run dev           # starts API on :3001

# in / (project root)
npm install
npm run dev           # starts Vite on :5173 with /api proxied to 3001
```

Access the site at `http://localhost:5173`. Visit `/login` and sign in with the admin credentials from your `.env` to enter edit mode.

## 2. Production with Docker

The repo ships two Dockerfiles and a `docker-compose.yml`:

- `./Dockerfile` — builds the SPA and serves it with nginx.
- `./server/Dockerfile` — builds the Node API.
- `./deploy/nginx.conf` — SPA fallback + proxies `/api/*` to the `ra-api` container.
- `./docker-compose.yml` — wires both containers, persists `/data` as a named volume.

Required env vars (read by compose):

| var | example |
| --- | --- |
| `JWT_SECRET` | long random string (`openssl rand -hex 32`) |
| `ADMIN_EMAIL` | `admin@raunlimited.com` |
| `ADMIN_PASSWORD` | strong password — only seeded on first run |
| `CORS_ORIGIN` | `https://raunlimited.com` (your production domain) |

Build and start:

```bash
docker compose up -d --build
```

The site is available on `:8088` (mapped from nginx). Bind it behind your reverse proxy / Cloudflare.

## 3. Deploying to the Hostinger / Portainer VPS

You already have Portainer running at `https://portainer.zlabs.com.br`. Two ways:

### Option A — push the repo and deploy via Portainer "Stacks"

1. Push this repo to GitHub (`github.com/pabloboeiralabs/garage-85` or another).
2. In Portainer → **Stacks** → **Add stack** → **Repository**.
3. Repo URL: your GitHub URL. Compose path: `docker-compose.yml`.
4. Add the four env vars (`JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ORIGIN`).
5. **Deploy the stack**. Portainer will build both images and start them.

### Option B — SSH and build there

```bash
ssh root@72.60.157.155
cd /opt && git clone <repo-url> ra-unlimited && cd ra-unlimited
cat > .env <<'EOF'
JWT_SECRET=$(openssl rand -hex 32)
ADMIN_EMAIL=admin@raunlimited.com
ADMIN_PASSWORD=...strong-password...
CORS_ORIGIN=https://raunlimited.com
EOF
docker compose up -d --build
```

## 4. Cloudflare DNS + SSL

1. In Cloudflare (zone `zlabs.com.br`), create an **A record** for the subdomain you want (e.g. `ra.zlabs.com.br`) pointing to `72.60.157.155`. Proxy: on (orange cloud).
2. If you already have a Traefik / nginx reverse-proxy on the VPS in front of Portainer, add a host rule for the chosen domain that points to the `ra-web` container on port 80. Otherwise, you can directly publish port 80/443 from `ra-web` and use Cloudflare's TLS termination ("Flexible" mode), or set up Certbot inside the nginx container.
3. SSL: Cloudflare → SSL/TLS → set to **Full (strict)** if you serve TLS from the origin, or **Flexible** if origin is plain HTTP.

## 5. First admin login

After the stack is up:

- Visit `https://<your-domain>/login`.
- Sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
- You will see a dark capsule at the bottom of the screen ("Editor mode").
- Click any text to edit it. Press Enter to save, Esc to cancel.

## 6. Backups

The SQLite DB is at `/data/ra.sqlite` inside the `ra-api` container, persisted in the `ra_data` named volume.

Manual snapshot:

```bash
docker compose exec ra-api sh -c "sqlite3 /data/ra.sqlite '.backup /data/backup-$(date +%F).sqlite'"
docker cp ra-api:/data/backup-$(date +%F).sqlite ./backups/
```

## 7. Updating content via API

If you ever need to restore or seed content from a JSON file:

```bash
# get current content
curl https://<your-domain>/api/content > content.json

# overwrite (requires admin token)
TOKEN=$(curl -s https://<your-domain>/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$ADMIN_EMAIL\",\"password\":\"$ADMIN_PASSWORD\"}" | jq -r .token)

curl -X PUT https://<your-domain>/api/content \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @content.json
```
