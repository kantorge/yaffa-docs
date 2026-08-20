---
title: Running YAFFA Behind a Custom Reverse Proxy
sidebar_label: Custom reverse proxy & HTTPS
sidebar_position: 5
description: Configure YAFFA to work correctly behind your own reverse proxy (Nginx Proxy Manager, Traefik, nginx, Apache, a cloud load balancer, etc.) and avoid mixed-content errors.
---

# Running YAFFA behind a custom reverse proxy

If you terminate HTTPS at your own reverse proxy — Nginx Proxy Manager, Traefik, plain nginx, Apache, a cloud load balancer, etc. — follow this guide to get URL generation and API requests working correctly and avoid mixed-content errors.

:::tip

The Docker Compose setup includes an optional Caddy service (commented out by default) that can handle HTTPS for you. If you enable it and follow its setup steps, you generally don't need this guide. This page is for administrators terminating HTTPS at their own, separately managed proxy.

:::

## Why this happens

In this deployment shape:

* HTTPS is terminated at your reverse proxy.
* YAFFA itself receives the request over plain HTTP from the proxy.
* The proxy must tell YAFFA the original request was HTTPS by sending an `X-Forwarded-Proto: https` header.
* YAFFA must be configured to trust that proxy before it will believe the header.

Both pieces are required, and neither compensates for the other:

* Setting `TRUSTED_PROXIES` doesn't help if the proxy never sends `X-Forwarded-Proto`.
* A proxy sending `X-Forwarded-Proto` doesn't help if YAFFA isn't configured to trust it.

If either is missing, YAFFA generates `http://` links and API URLs even though your site is served over HTTPS, and browsers block those requests as mixed content. No application code changes are needed to fix this — it's purely a matter of configuring `TRUSTED_PROXIES` and your proxy correctly.

## `TRUSTED_PROXIES`

`TRUSTED_PROXIES` in `.env` accepts:

* `*` or `**` — trust the directly connecting peer (i.e. whatever IP the request physically arrives from).
* A single IPv4 or IPv6 address.
* A CIDR range (e.g. `10.0.0.0/8`).
* Multiple addresses/ranges, separated by commas — whitespace around entries is trimmed automatically, so `1.2.3.4, 5.6.7.8` works the same as `1.2.3.4,5.6.7.8`.

An entry that isn't a valid IP or CIDR range is simply never matched — it won't crash YAFFA and won't grant trust to anything, so a typo here fails closed rather than open.

Prefer listing your proxy's specific IP/CIDR where practical. `*`/`**` is appropriate when YAFFA itself isn't directly reachable by untrusted clients (for example, only the proxy can reach the container's port) — trusting forwarded headers is a security boundary, since anyone who can send YAFFA a request directly could otherwise forge `X-Forwarded-Proto`/`X-Forwarded-For` and spoof their scheme or IP.

## `.env` settings

```env
APP_URL=https://yaffa.example.com
TRUSTED_PROXIES=*            # or a specific IP/CIDR, e.g. 172.18.0.0/16
```

* `APP_URL` must be the externally visible `https://` URL. It addresses a different concern than `TRUSTED_PROXIES`: `APP_URL` is the base URL YAFFA uses when it can't otherwise determine the scheme, while `TRUSTED_PROXIES` is what lets YAFFA trust the *actual* forwarded scheme on a per-request basis. Setting one doesn't replace the other.

`SANCTUM_STATEFUL_DOMAINS` and `SESSION_DOMAIN` are **not** required for every reverse-proxy setup — only set them if YAFFA is exposed on a different subdomain or port than a default same-origin deployment would use:

```env
# Only needed if you're accessing YAFFA on a non-default subdomain or port
SANCTUM_STATEFUL_DOMAINS=yaffa.example.com
SESSION_DOMAIN=.example.com
```

:::caution

Restart the containers after changing `.env` — a mere restart doesn't reload environment variables. Run:

```bash
docker compose down && docker compose up -d
```

:::

## Reverse proxy configuration

### Plain nginx (or anything nginx-based)

```nginx
location / {
    proxy_pass http://<yaffa-app-host>:80;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
}
```

### Nginx Proxy Manager

The "Details" tab of a Proxy Host (scheme, forward host/port) doesn't always guarantee `X-Forwarded-Proto` is sent. If YAFFA still receives requests as plain HTTP, add a **Custom Nginx Configuration** block on the Proxy Host with:

```nginx
proxy_set_header X-Forwarded-Proto $scheme;
```

### Traefik

```yaml
- "traefik.http.routers.yaffa.tls=true"
- "traefik.http.services.yaffa.loadbalancer.server.port=80"
```

Traefik is expected to set `X-Forwarded-Proto` automatically when it terminates TLS. Behavior can vary with custom middleware or unusual routing setups, so if you hit mixed-content issues, verify the header is actually arriving (see Troubleshooting below).

### Your own Caddy instance

If you're running Caddy yourself (outside of the Docker Compose setup's optional Caddy service), it's expected to set `X-Forwarded-Proto` automatically as well. As with Traefik, verify this if you run into issues — custom Caddyfile directives can change this behavior.

## Troubleshooting: Mixed Content / broken API calls

If the app loads and login works, but AJAX calls fail with a browser console error like:

```
Mixed Content: The page at 'https://yaffa.example.com/' was loaded over HTTPS,
but requested an insecure XMLHttpRequest endpoint 'http://yaffa.example.com/api/...'.
This request has been blocked.
```

check the following, in order:

1. **Confirm `APP_URL` uses `https://`** in your `.env` file.
2. **Confirm `TRUSTED_PROXIES` is set** and contains your proxy's address/range (or intentionally uses `*`/`**`).
3. **Confirm the proxy actually sends `X-Forwarded-Proto: https` to YAFFA.** This is the hop between your proxy and the YAFFA container, not the one between the browser and your proxy, so the browser's network tab won't show it. Check your reverse proxy's own configuration and access/request logs, or run a request against the YAFFA container directly (e.g. `curl -v` from the proxy host) to confirm the header is present. Avoid turning on `APP_DEBUG` on a production instance just to inspect this.
4. **Recreate the containers** after any `.env` change — `docker compose down && docker compose up -d`, not just `restart`.

If you've confirmed all of the above and still see the issue, please [open an issue](https://github.com/kantorge/yaffa/issues) with your proxy type and configuration.
