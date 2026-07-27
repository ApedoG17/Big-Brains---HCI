# 06 - Deployment and Release Notes

## 1. Deployment target

- **Staging Environment:** `https://staging.archiverse-app.com` (Hosted on Vercel for Frontend and Render for Django API)
- **Production Environment:** `https://archiverse-app.com` (Main release target)
- **Database Target:** Managed PostgreSQL instance hosted on Render / Supabase
- **Repository Release Tag:** `v0.2-beta` (`https://github.com/archiverse-team/archiverse-core/releases/tag/v0.2-beta`)

---

## 2. Environment variables/configuration

> **Note:** Never commit actual secret values (passwords, private keys, API secrets) to version control. Use `.env.example` as a template in local and deployment environments.

| Variable | Purpose | Required? |
|----------|---------|-----------|
| `DEBUG` | Enables/disables Django debug mode (`True` for dev, `False` for staging/prod) | Yes |
| `SECRET_KEY` | Cryptographic key used for Django session signing and security hashes | Yes |
| `DATABASE_URL` | Connection string for PostgreSQL database instance | Yes |
| `ALLOWED_HOSTS` | Comma-separated list of domain names/IPs allowed to serve the app | Yes |
| `CORS_ALLOWED_ORIGINS` | Permitted origins allowed to make cross-site HTTP requests (React frontend domain) | Yes |
| `JWT_SECRET_KEY` | Secret key used to sign and verify JWT access/refresh tokens | Yes |
| `ACCESS_TOKEN_LIFETIME_MINUTES` | Configures validity duration of JWT access tokens (default: `60`) | No |

---

## 3. Deployment steps

Follow these step-by-step instructions to deploy the system to staging or production environments:

### Prerequisites
1. Ensure Git, Python 3.11+, Node.js 18+, and Docker/PostgreSQL are installed on the target environment.
2. Verify that all GitHub Actions CI checks have passed on the `main` branch.

### Step 1: Clone Repository & Check Out Release Tag
```bash
git clone [https://github.com/archiverse-team/archiverse-core.git](https://github.com/archiverse-team/archiverse-core.git)
cd archiverse-core
git fetch --tags
git checkout tags/v0.2-beta